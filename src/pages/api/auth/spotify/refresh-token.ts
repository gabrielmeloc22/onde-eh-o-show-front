import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { refresh_token },
    method,
  } = req;

  if (method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    res.redirect("/");
  }
  try {
    const config = {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const formData = {
      grant_type: "refresh_token",
      refresh_token,
    };

    const formBody = Object.entries(formData)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      .join("&");

    const {
      data: { access_token, expires_in },
    } = await axios.post("https://accounts.spotify.com/api/token", formBody, config);

    res.status(200).json({ access_token, expires_in });
  } catch (err: any) {
    const code = err?.response?.status || 500;
    const message = err?.response?.data?.error_description || "Something went wrong";

    res.status(code).json({ message: message });
  }
}
