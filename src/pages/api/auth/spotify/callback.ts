import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import SimpleCrypto from "simple-crypto-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { code, state, error },
  } = req;

  const simpleCrypto = new SimpleCrypto(process.env.SPOTIFY_STATE_SECRET);

  if (error || !state) {
    res.redirect("/");
  } else if (!simpleCrypto.decrypt(state as string)) {
    res.redirect("/");
  } else {
    try {
      const details = {
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      };
      const formBody = Object.entries(details)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
        )
        .join("&");

      const {
        data: { access_token, refresh_token, expires_in },
      } = await axios.post("https://accounts.spotify.com/api/token", formBody, {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      nookies.set({ res }, "spotify.access_token", access_token, {
        maxAge: expires_in,
        path: "/",
        secure: true,
      });
      nookies.set({ res }, "spotify.refresh_token", refresh_token, {
        path: "/",
        secure: true,
      });

      res.redirect("/top-artists");
    } catch (err) {
      res.redirect("/");
      console.log(err);
    }
  }
}
