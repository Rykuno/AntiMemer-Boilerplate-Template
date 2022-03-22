import { Button } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { useRouter } from "next/router";

export const AuthButton = () => {
  const [authModalOpened, toggleAuthModal] = useBooleanToggle(false);
  const { push, asPath, replace } = useRouter();

  return (
    <>
      <Button
        onClick={() => replace({ pathname: asPath, query: { auth: true } })}
      >
        Login
      </Button>
    </>
  );
};
