import { Center, Modal, ModalProps, Tabs, Title } from "@mantine/core";
import React, { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { gql, useApolloClient } from "@apollo/client";
import {
  MeDocument,
  MeFragmentDoc,
  MeQuery,
  useSignupMutation
} from "lib/graphql";
import { LOGIN_REFRESH_TOKEN_KEY, LOGIN_TOKEN_KEY } from "lib/config";
import { useForm } from "@mantine/form";

const _ = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      user {
        ...Me
      }
      accessToken
      refreshToken
    }
  }
  ${MeFragmentDoc}
`;

interface FormProps {
  onConfirm: () => void;
}

export const SignupForm = ({ onConfirm }: FormProps) => {
  const client = useApolloClient();

  const [register, { loading }] = useSignupMutation();

  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { data } = await register({
      variables: {
        data: {
          email: values.email,
          password: values.password
        }
      }
    });

    await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({
        [LOGIN_TOKEN_KEY]: data.signup.accessToken,
        [LOGIN_REFRESH_TOKEN_KEY]: data.signup.refreshToken
      })
    });

    client.writeQuery<MeQuery>({
      query: MeDocument,
      data: { me: data.signup.user }
    });

    onConfirm();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Email"
        placeholder="you@mantine.dev"
        required
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
        {...form.getInputProps("password")}
      />
      <Button fullWidth mt="xl" loading={loading} type="submit">
        Register
      </Button>
    </form>
  );
};
