import { useAuth } from "../../../contexts/auth";
import { useGetTrackedArtistsQuery } from "../../../hooks/useGetTrackedArtistsQuery";

// es
export function useIsTrackedArtist(artistId: string) {
  const { user } = useAuth();
  const { data } = useGetTrackedArtistsQuery(user?.id);

  return data?.some((artist) => artist.spotifyId === artistId) ?? false;
}
