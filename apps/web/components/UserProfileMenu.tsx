import { Menu, Divider, Text, Avatar, ActionIcon } from "@mantine/core";
import { useLogout } from "lib/hooks/useLogout";
import { useMe } from "lib/hooks/useMe";

export const UserProfileMenu = () => {
  const { me } = useMe();
  const logout = useLogout();

  return (
    <Menu
      control={
        <ActionIcon>
          <Avatar src={me.avatar} size="sm" />
        </ActionIcon>
      }
    >
      <Menu.Label>Profile</Menu.Label>
      <Menu.Item>My Profile</Menu.Item>
      <Divider />
      <Menu.Label>Danger Zone</Menu.Label>
      <Menu.Item color="red" onClick={logout}>Logout</Menu.Item>
    </Menu>
  );
};
