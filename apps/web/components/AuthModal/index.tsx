import { Center, Modal, Group, Tabs } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { Logo } from "../Logo";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const AuthModal = () => {
  const { replace, asPath, query } = useRouter();

  const handleClose = () => {
    const path = asPath.replace("?auth=true", "");
    replace(path);
  };

  return (
    <Modal opened={!!query.auth} onClose={handleClose} withCloseButton={false}>
      <Group grow direction="column" spacing={0}>
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
