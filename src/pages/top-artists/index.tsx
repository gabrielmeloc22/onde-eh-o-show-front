import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { Plus } from "phosphor-react";
import { ArtistCard } from "../../components/ArtistCard";
import { Layout } from "../../components/Layout";
import { Box, Button, Text } from "../../components/Primitives";
import { createSpotifyApi } from "../../services/SpotifyAPI";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { NextPageWithLayout } from "../_app";

export type Artist = {
  name: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  href: string;
  id: string;
};

interface TopArtistsProps {
  topArtists: Artist[];
}

const TopArtists: NextPageWithLayout<TopArtistsProps> = ({ topArtists }) => {
  return (
    <>
      <Head>
        <title>My Top Artists</title>
      </Head>
      <Box
        css={{
          display: "grid",
          mt: "$4",
          mx: "auto",
          w: "100%",
          "@bp1": {
            gridTemplateColumns: "1fr",
          },
          "@bp2": {
            gridTemplateColumns: "repeat(auto-fit, minmax(325px, 1fr))",
          },
          gap: "$5",
        }}
      >
        {topArtists?.map(({ href, images, name, id }) => (
          <ArtistCard key={href} id={id} image={images[0]} name={name} />
        ))}
        <Box
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid $slate5",
          }}
        >
          <Button type="ghost">
            <Text css={{ color: "$slate9", mb: "$3" }}>Buscar outros artistas</Text>
            <Plus size="2rem" />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const spotifyApi = createSpotifyApi(ctx);

  const { data } = await spotifyApi.get("/me/top/artists", {
    params: {
      limit: 5,
      time_range: "medium_term",
    },
  });
  return {
    props: { topArtists: data.items },
  };
});

TopArtists.getLayout = (page) => <Layout>{page}</Layout>;

export default TopArtists;
