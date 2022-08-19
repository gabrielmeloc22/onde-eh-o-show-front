import axios, { AxiosInstance } from "axios";
import nookies, { parseCookies } from "nookies";

interface SpotifyApi extends AxiosInstance {
  getAccessToken: (ctx: Parameters<typeof nookies.get>[0]) => string;
}

const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
}) as SpotifyApi;

spotifyApi.getAccessToken = (ctx) => {
  return parseCookies(ctx ?? undefined)["spotify.access_token"];
};

spotifyApi.interceptors.request.use((config) => {
  const token = spotifyApi.getAccessToken(config.headers)
  if(config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
})

export { spotifyApi };

