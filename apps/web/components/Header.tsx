import React from "react";
import {
  createStyles,
  Menu,
  Center,
  Header as MHeader,
  Container,
  Group,
  Button,
  Burger
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { FaChevronDown } from "react-icons/fa";
import { Logo } from "components/Logo";
import { ColorSchemeToggleButton } from "components/ColorSchemeToggleButton";
import { UserProfileMenu } from "components/UserProfileMenu";
import { AuthButton } from "components/AuthButton";
import { useMe } from "lib/hooks/useMe";
const HEADER_HEIGHT = 60;

const useStyles = createStyles(theme => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },

  linkLabel: {
    marginRight: 5
  }
}));

const links = [
  {
    link: "/about",
    label: "Features"
  },
  {
    link: "#1",
    label: "Learn",
    links: [
      {
        link: "/docs",
        label: "Documentation"
      },
      {
        link: "/resources",
        label: "Resources"
      },
      {
        link: "/community",
        label: "Community"
      },
      {
        link: "/blog",
        label: "Blog"
      }
    ]
  },
  {
    link: "/about",
    label: "About"
  },
  {
    link: "/pricing",
    label: "Pricing"
  },
  {
    link: "#2",
    label: "Support",
    links: [
      {
        link: "/faq",
        label: "FAQ"
      },
      {
        link: "/demo",
        label: "Book a demo"
      },
      {
        link: "/forums",
        label: "Forums"
      }
    ]
  }
];

export function Header() {
  const { classes } = useStyles();
  const { me } = useMe();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const items = links.map(link => {
    const menuItems = link.links?.map(item => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a
              href={link.link}
              className={classes.link}
              onClick={event => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <FaChevronDown size={12} />
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={event => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <MHeader height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <Logo />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Group>
          <ColorSchemeToggleButton />
          {me && <UserProfileMenu />}
          {!me && <AuthButton size="sm" />}
        </Group>
      </Container>
    </MHeader>
  );
}
