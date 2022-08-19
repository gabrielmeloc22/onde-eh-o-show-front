import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import SimpleCrypto from "simple-crypto-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPE } =
    process.env;

  const simpleCrypto = new SimpleCrypto(process.env.SPOTIFY_STATE_SECRET);
  const state = simpleCrypto.encrypt(nanoid(16));

  if (method === "GET") {
    res.redirect(
      `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&scope=${SPOTIFY_SCOPE}&redirect_uri=${SPOTIFY_REDIRECT_URI}&state=${state}`
    );
  } else {
    res.redirect("/");
  }
}
