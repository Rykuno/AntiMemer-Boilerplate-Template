import { gql } from "@apollo/client";
import { Title, Loader, Text, Stack, ThemeIcon, Button } from "@mantine/core";
import { useVerifyEmailTokenMutation } from "lib/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdCheck, MdClose } from "react-icons/md";

const _ = gql`
  mutation VerifyEmailToken($token: String!) {
    verifyEmailToken(token: $token) {
      id
    }
  }
`;

const VerifyPage = () => {
  const { query } = useRouter();

  const [verify, { loading, error, data, called }] =
    useVerifyEmailTokenMutation();

  useEffect(() => {
    if (query.token && !loading && !called) {
      verify({ variables: { token: query.token as string } });
    }
  }, [query, verify, called, loading]);

  return (
    <Stack align="center" spacing="xl" pt="5%">
      {loading && <Loader size="xl" />}
      {!loading && (
        <ThemeIcon color={error ? "red" : "green"} size={56} radius="xl">
          {error && <MdClose style={{ fontSize: 56 }} />}
          {!error && <MdCheck style={{ fontSize: 56 }} />}
        </ThemeIcon>
      )}
      <Stack spacing={0} align="center">
        <Title align="center">Verify your email</Title>
        {error && (
          <Text size="lg" color="dimmed">
            {error.message}
          </Text>
        )}
      </Stack>
      <Button>Resend Verification Link</Button>
    </Stack>
  );
};

export default VerifyPage;
