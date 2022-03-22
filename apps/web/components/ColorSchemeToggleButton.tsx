import React from "react";
import { useMantineColorScheme, ActionIcon, Group } from "@mantine/core";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export function ColorSchemeToggleButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        radius="md"
        sx={theme => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6]
        })}
      >
        {colorScheme === "dark" ? (
          <MdLightMode size={24} />
        ) : (
          <MdDarkMode size={24} />
        )}
      </ActionIcon>
    </Group>
  );
}
