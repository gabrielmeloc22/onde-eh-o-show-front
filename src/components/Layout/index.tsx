import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Box } from "../Primitives";
import { Nav } from "./Nav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <Box
      css={{
        display: "grid",
        h: "100%",
        minH: "100vh",
        maxW: "1300px",
        mx: "auto",
        px: "$4",
        gridTemplateRows: "auto 4fr auto",
      }}
    >
      <Header />
      <Box
        as="main"
        css={{
          display: "flex",
          flexDir: "column",
        }}
      >
        {router.asPath !== "/" && <Nav />}
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
