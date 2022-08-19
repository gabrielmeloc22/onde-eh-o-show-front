import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../contexts/auth";
import { client } from "../services/Apollo";
import { globalStyles } from "../styles/globalStyles";
import { darkTheme } from "../styles/stitches.config";

if (process.env.NEXT_PUBLIC_API_MOCKING === "true") {
  const { initMocks } = require("../../.mocks");
  initMocks();
}

export default function MyApp({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  globalStyles();
  return (
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: "light",
        dark: darkTheme.className,
      }}
    >
      <AuthProvider>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
