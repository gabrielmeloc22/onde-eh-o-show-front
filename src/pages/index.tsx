import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { FaSpotify } from "react-icons/fa";
import { Box, Button } from "../components/Primitives";
import { signIn, useAuth } from "../contexts/auth";
import { withSSRGuest } from "../utils/withSSRGuest";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const { status } = useAuth();

  return (
    <>
      <Head>
        <title>Onde é o Show | Página Inicial</title>
        <meta
          name="description"
          content="Saiba onde seus artistas favoritos vão estar se apresentando"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as="main"
        css={{
          h: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          css={{
            display: "flex",
            alignItems: "center",
            gap: "$2",
          }}
          onClick={() => signIn()}
        >
          Entre com Spotify
          <FaSpotify />
        </Button>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
  return { props: {} };
});

export default Home;
