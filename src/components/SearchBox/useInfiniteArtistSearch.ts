import { QueryFunctionContext, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { createSpotifyApi } from "../../services/SpotifyAPI";

export type Artist = {
  id: string;
  name: string;
  href: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
};

type QueryResult = {
  items: Artist[];
  next: string;
};

type RequestResponse = {
  artists: QueryResult;
};

export const useInfiniteArtistSearch = (search: string) => {
  async function getArtists({ pageParam }: QueryFunctionContext<QueryKey, string>) {
    const spotifyApi = createSpotifyApi();

    let result: QueryResult | undefined;
    try {
      if (pageParam) {
        const { data } = await spotifyApi.get(pageParam);
        result = data.artists as QueryResult;
      } else {
        const { data } = await spotifyApi.get<RequestResponse>("/search", {
          params: {
            q: search,
            type: "artist",
            limit: 9,
          },
        });
        result = data.artists;
      }

      const mappedItems = result.items.map(({ href, id, images, name }) => ({
        href,
        id,
        images,
        name,
      }));

      return {
        items: mappedItems,
        next: result?.next,
      };
    } catch (e) {
      console.error(e);
    }
  }

  return useInfiniteQuery([search], getArtists, {
    staleTime: 1000 * 60 * 60,
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!search,
    select: (data) => {
      // Since Spotify's API might return the same artist multiple times, we need to filter them out here.

      const normalized = data.pages.flatMap((page) => page?.items ?? []).reverse();
      normalized.forEach((itemA, indexA, arr) => {
        if (arr.some((itemB, indexB) => itemA.id === itemB.id && indexA !== indexB)) {
          arr.splice(indexA, 1);
        }
      });

      return {
        pageParams: data.pageParams,
        pages: normalized.reverse(),
      };
    },
  });
};
