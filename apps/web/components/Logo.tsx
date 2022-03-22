import { Image, Group, Title } from "@mantine/core";

export const Logo = () => {
  return (
    <Group noWrap spacing="xs">
      <Image
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        height={32}
        alt="logo"
      />
      <Title order={2} sx={{ fontWeight: 900, letterSpacing: "tighter" }}>
        Poptaro
      </Title>
    </Group>
  );
};
