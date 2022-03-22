import { Center, Modal, ModalProps, Tabs, Title } from "@mantine/core";
import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Text,
  Container,
  Group,
  Button
} from "@mantine/core";
import { gql, useApolloClient } from "@apollo/client";
import {
  MeDocument,
  MeFragmentDoc,
  MeQuery,
  useLoginMutation,
  useSignupMutation
} from "lib/graphql";
import { LOGIN_REFRESH_TOKEN_KEY, LOGIN_TOKEN_KEY } from "lib/config";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { Logo } from "./Logo";

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

const SignupForm = ({ onConfirm }: FormProps) => {
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

const LoginForm = ({ onConfirm }: FormProps) => {
  const client = useApolloClient();

  const [login, { loading }] = useLoginMutation();
  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { data } = await login({
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
        [LOGIN_TOKEN_KEY]: data.login.accessToken,
        [LOGIN_REFRESH_TOKEN_KEY]: data.login.refreshToken
      })
    });

    client.writeQuery<MeQuery>({
      query: MeDocument,
      data: { me: data.login.user }
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
        Sign in
      </Button>
    </form>
  );
};

export const AuthModal = ({ opened }) => {
  const { replace, asPath } = useRouter();

  const handleClose = () => {
    const path = asPath.replace("?auth=true", "");
    replace(path);
  };

  return (
    <Modal opened={opened} onClose={handleClose} withCloseButton={false}>
      <Group grow direction="column">
        <Center>
          <Logo />
        </Center>
        <Tabs>
          <Tabs.Tab label="Login">
            <LoginForm onConfirm={handleClose} />
          </Tabs.Tab>
          <Tabs.Tab label="Signup">
            <SignupForm onConfirm={handleClose} />
          </Tabs.Tab>
        </Tabs>
      </Group>
    </Modal>
  );
};
