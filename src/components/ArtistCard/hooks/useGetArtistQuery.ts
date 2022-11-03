import { useQuery } from "@tanstack/react-query";
import { createSpotifyApi } from "../../../services/SpotifyAPI";

type Artist = {
  name: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
};

const fetchArtist = async (spotifyId: string) => {
  const spotifyApi = createSpotifyApi();

  const { data } = await spotifyApi.get<Artist>("/artists/" + spotifyId);

  return {
    name: data.name,
    image: data.images[0].url,
  };
};

export function useGetArtistQuery(spotifyId: string) {
  return useQuery([spotifyId], () => fetchArtist(spotifyId), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
