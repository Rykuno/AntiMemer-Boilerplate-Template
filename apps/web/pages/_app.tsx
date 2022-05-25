import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RootLayout } from "components/layouts/RootLayout";
import {
  MantineProvider,
  Button,
  ColorSchemeProvider,
  ColorScheme
} from "@mantine/core";

import { useApollo } from "lib/apollo/client";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function BoilerplateApp(props: AppPropsWithLayout) {
  const { Component, pageProps, router } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  const getLayout = Component.getLayout ?? (page => page);
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  if (router.pathname === "/healthz") return <Component {...pageProps} />;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              colorScheme,
              loader: "dots",
              fontFamily: "Greycliff CF, sans-serif"
            }}
            withNormalizeCSS
            withGlobalStyles
          >
            <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
          </MantineProvider>
        </ColorSchemeProvider>
      </ApolloProvider>
    </>
  );
}
