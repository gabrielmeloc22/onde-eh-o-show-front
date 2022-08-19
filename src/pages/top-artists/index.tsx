import Head from "next/head";
import { GetServerSideProps, NextPage } from "next/types";
import { ArtistCard } from "../../components/ArtistCard";
import { Box, Text } from "../../components/Primitives";
import { spotifyApi } from "../../services/SpotifyAPI";

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

const TopArtists: NextPage<TopArtistsProps> = ({ topArtists }) => {
  return (
    <>
      <Head>
        <title>My Top Artists</title>
      </Head>
      <Text
        css={{
          textAlign: "center",
          mb: "$5",
          fontSize: "large",
        }}
      >
        Aqui estão alguns dos artistas que você anda escutando recentemente no
        Spotify
      </Text>
      <Box
        css={{
          display: "grid",
          "@bp1": {
            gridTemplateColumns: "1fr",
          },
          "@bp2": {
            gridTemplateColumns: "repeat(auto-fit, minmax(425px, 1fr))",
          },
          gap: "$5",
        }}
      >
        {topArtists?.map(({ href, images, name, id }, i) => (
          <ArtistCard
            key={href}
            id={String(i + 1)}
            image={images[0]}
            name={name}
          />
        ))}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = spotifyApi.getAccessToken(ctx.res);

  if (accessToken) {
    const { data } = await spotifyApi.get("/me/top/artists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 10,
        time_range: "medium_term",
      },
    });
    return {
      props: { topArtists: data.items },
    };
  }
  return {
    props: { topArtists: null },
  };
};

export default TopArtists;
