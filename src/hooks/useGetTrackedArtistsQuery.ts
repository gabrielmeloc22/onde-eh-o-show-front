import { useGetTrackedArtistsQuery as getTrackedArtistQuery } from "../../generated/graphql";

export type GetTrackedArtistsData = ReturnType<typeof useGetTrackedArtistsQuery>;

export function useGetTrackedArtistsQuery(userSpotifyId: string | undefined) {
  return getTrackedArtistQuery(
    {
      where: {
        spotifyId: {
          equals: userSpotifyId,
        },
      },
    },
    {
      enabled: !!userSpotifyId,
      select: (data) => data.user?.trackedArtists,
      staleTime: Infinity,
    }
  );
}
