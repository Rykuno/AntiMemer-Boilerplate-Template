import React from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { gql, useApolloClient } from "@apollo/client";
import {
  MeDocument,
  MeFragmentDoc,
  MeQuery,
  useLoginMutation
} from "lib/graphql";
import { LOGIN_REFRESH_TOKEN_KEY, LOGIN_TOKEN_KEY } from "lib/config";
import { useForm } from "@mantine/form";

const __ = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
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

export const LoginForm = ({ onConfirm }: FormProps) => {
  const client = useApolloClient();

  const [login, { loading }] = useLoginMutation();
  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const { data, errors } = await login({
        variables: {
          data: {
            email: values.email,
            password: values.password
          }
        }
      });

      if (errors) {
        if (errors[0].message.includes("email"))
          form.setFieldError("email", errors[0].message);
        if (errors[0].message.includes("password"))
          form.setFieldError("password", errors[0].message);
      }

      await fetch("/api/login", {
        method: "post",
        body: JSON.stringify({
          [LOGIN_TOKEN_KEY]: data.login.accessToken,
          [LOGIN_REFRESH_TOKEN_KEY]: data.login.refreshToken
        })
      });

      client.writeQuery<MeQuery>({
        query: MeDocument,
        data: { me: data.login.user }
      });
      onConfirm();
    } catch (e) {
      console.log(e);
    }
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
        Sign in
      </Button>
    </form>
  );
};
