import { Button, ButtonProps } from "@mantine/core";
import { useRouter } from "next/router";

export const AuthButton = (props: ButtonProps<any>) => {
  const { asPath, replace } = useRouter();

  return (
    <>
      <Button
        onClick={() => replace({ pathname: asPath, query: { auth: true } })}
        {...props}
      >
        Login
      </Button>
    </>
  );
};
