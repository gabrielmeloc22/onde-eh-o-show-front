import Head from "next/head";
import NextLink from "next/link";
import { GetServerSideProps } from "next/types";
import { MagnifyingGlass } from "phosphor-react";
import { FaSpotify } from "react-icons/fa";
import { Artist, useImportFavoriteArtistsMutation } from "../../../generated/graphql";
import { ArtistCard } from "../../components/ArtistCard";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Box, Text } from "../../components/Primitives";
import { useAuth } from "../../contexts/auth";
import { useGetTrackedArtistsQuery } from "../../hooks/useGetTrackedArtistsQuery";
import { createSpotifyApi } from "../../services/SpotifyAPI";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { NextPageWithLayout } from "../_app";

const TopArtists: NextPageWithLayout = () => {
  const { user } = useAuth();
  const { mutateAsync, isLoading: isMutating } = useImportFavoriteArtistsMutation();
  const { data: trackedArtists, refetch } = useGetTrackedArtistsQuery(user?.id);

  const handleImportTopArtists = async () => {
    const spotifyApi = createSpotifyApi();
    const { data } = await spotifyApi("/me/top/artists", {
      params: {
        limit: 9,
        time_range: "short_term",
      },
    });

    await mutateAsync({
      where: {
        spotifyId: user?.id,
      },
      data: {
        trackedArtists: {
          create: data.items.map(({ id }: Artist) => ({
            artist: {
              connectOrCreate: {
                create: {
                  spotifyId: id,
                },
                where: {
                  spotifyId: id,
                },
              },
            },
          })),
        },
      },
    }).then(() => {
      refetch();
    });
  };

  return (
    <>
      <Head>
        <title>Artistas Favoritos</title>
      </Head>
      {trackedArtists && trackedArtists.length > 0 ? (
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
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            },
            gap: "$5",
          }}
        >
          {trackedArtists?.map(({ spotifyId }) => (
            <ArtistCard key={spotifyId} id={spotifyId} />
          ))}
        </Box>
      ) : (
        <Box
          css={{
            h: "100%",
            display: "flex",
            flexDir: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "$3",
          }}
        >
          <Text
            color="neutral-medium"
            css={{
              mt: "$10",
              mb: "$7",
            }}
          >
            Parece que você não segue nenhum artista!
          </Text>
          <Button
            css={{
              display: "flex",
              alignItems: "center",
              gap: "$2",
            }}
            isLoading={isMutating}
            onClick={handleImportTopArtists}
          >
            Importar meus artistas favoritos do Spotify
            <FaSpotify />
          </Button>
          <Text color="neutral-medium">ou</Text>
          <NextLink href="/pesquisar">
            <Button
              css={{
                display: "flex",
                alignItems: "center",
                gap: "$2",
                mb: "auto",
              }}
            >
              Buscar artistas
              <MagnifyingGlass size={18} weight="bold" />
            </Button>
          </NextLink>
        </Box>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});

TopArtists.getLayout = (page) => <Layout>{page}</Layout>;

export default TopArtists;
