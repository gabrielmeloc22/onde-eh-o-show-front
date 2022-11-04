import { GetServerSideProps } from "next";
import Head from "next/head";
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { ArtistCard } from "../../components/ArtistCard";
import { Box } from "../../components/Primitives";
import { SearchBox } from "../../components/SearchBox";
import { useInfiniteArtistSearch } from "../../components/SearchBox/useInfiniteArtistSearch";
import { Spinner } from "../../components/Spinner";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { NextPageWithLayout } from "../_app";

interface SearchProps {}

const Search: NextPageWithLayout<SearchProps> = () => {
  const [search, setSearch] = useState("");
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteArtistSearch(search);

  const pageEndEl = useRef<HTMLDivElement>(null);
  const artists = data?.pages ?? [];

  useEffect(() => {
    if (!hasNextPage) return;
    if (isFetching) return;

    const observer = new IntersectionObserver(async (entries) => {
      if (!entries[0].isIntersecting) return;
      await fetchNextPage();
    });
    observer.observe(pageEndEl.current!);

    return () => observer.disconnect();
  }, [isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      <Head>
        <title>Onde é o Show | Pesquisar</title>
      </Head>
      <SearchBox
        onChange={(e: BaseSyntheticEvent) => {
          setSearch(e.target.value);
        }}
      />
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
        {artists?.map(({ id }) => (
          <ArtistCard key={id} id={id} />
        ))}
      </Box>
      {isFetching && <Spinner css={{ alignSelf: "center", mt: "$6" }} weight="bold" />}
      <Box ref={pageEndEl} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => ({
  props: {},
}));

export default Search;
