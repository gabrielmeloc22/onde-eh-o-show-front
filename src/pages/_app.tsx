import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { NextPage } from "next/types";
import { ReactNode } from "react";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../contexts/auth";
import { queryClient } from "../services/ReactQuery";
import { globalStyles } from "../styles/globalStyles";
import { darkTheme } from "../styles/stitches.config";

if (process.env.NEXT_PUBLIC_API_MOCKING === "true") {
  const { initMocks } = require("../../.mocks");
  initMocks();
}

export type NextPageWithLayout<P = any> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  globalStyles();
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

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
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
