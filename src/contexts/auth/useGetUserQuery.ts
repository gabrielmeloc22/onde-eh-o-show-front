import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { createSpotifyApi } from "../../services/SpotifyAPI";

type User = {
  display_name: string;
  email: string;
  images: string[];
  id: string;
};

const fetchUser = async () => {
  const spotifyApi = createSpotifyApi();
  const res = await spotifyApi.get<User>("/me");
  return res.data;
};

export function useGetUserQuery() {
  const refreshToken = parseCookies()["spotify.refresh_token"];

  return useQuery(["User"], fetchUser, {
    staleTime: Infinity,
    enabled: !!refreshToken,
  });
}
