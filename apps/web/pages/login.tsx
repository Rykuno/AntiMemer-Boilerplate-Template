import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
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
  useLoginMutation
} from "lib/graphql";
import {
  LOGIN_REFRESH_TOKEN_KEY,
  LOGIN_TOKEN_KEY,
  REDIRECT_PATH
} from "lib/config";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";

const _ = gql`
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

const Login = () => {
  const client = useApolloClient();

  const [login, { loading }] = useLoginMutation();
  const router = useRouter();
  const redirect = router.query[REDIRECT_PATH] as string | undefined;
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

    router.replace(redirect || "/");
  };

  return (
    <Container size={420} my={40}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title
          align="center"
          sx={theme => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor<"a">
            href="#"
            size="sm"
            onClick={event => event.preventDefault()}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor<"a">
              onClick={event => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" loading={loading} type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default Login;
