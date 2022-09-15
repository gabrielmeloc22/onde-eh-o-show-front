import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext, NextPageContext } from "next";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../../contexts/auth";

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}[] = [];

export function createSpotifyApi(ctx?: NextPageContext | GetServerSidePropsContext) {
  const cookies = parseCookies(ctx?.res);
  const spotifyApi = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${cookies["spotify.access_token"]}`,
    },
  });
  spotifyApi.interceptors.response.use(
    (res) => res,
    (error: AxiosError<any>) => {
      if (error.response?.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;

          const authApi = axios.create({
            baseURL: process.env.BASE_URL,
          });
          const refreshToken = cookies["spotify.refresh_token"];
          const originalConfig = error.config;

          authApi
            .post("/api/auth/spotify/refresh-token", {
              refresh_token: refreshToken,
            })
            .then(({ data: { access_token, expires_in } }) => {
              setCookie(ctx, "spotify.access_token", access_token, {
                maxAge: expires_in,
                path: "/",
                secure: true,
              });
              spotifyApi.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

              failedRequestsQueue.forEach((request) => {
                request.onSuccess(access_token);
              });
              failedRequestsQueue = [];
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => {
                request.onFailure(err);
              });
              failedRequestsQueue = [];
              signOut();
            })
            .finally(() => {
              isRefreshing = false;
            });

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token) => {
                if (!originalConfig.headers) return;
                originalConfig.headers.Authorization = `Bearer ${token}`;

                resolve(spotifyApi(originalConfig));
              },
              onFailure: (err) => {
                reject(err);
              },
            });
          });
        }
      }
      return Promise.reject(error);
    }
  );
  return spotifyApi;
}
