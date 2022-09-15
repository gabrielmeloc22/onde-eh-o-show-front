import { default as router } from "next/router";
import nookies, { parseCookies } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createSpotifyApi } from "../../services/SpotifyAPI";

type User = {
  display_name: string;
  email: string;
  images: string[];
  id: string;
};

interface AuthContextData {
  user: User | undefined;
  status: "loading" | "authenticated" | "unauthenticated";
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState<AuthContextData["status"]>("loading");

  useEffect(() => {
    const spotifyApi = createSpotifyApi();
    const accessToken = parseCookies()["spotify.access_token"];

    if (accessToken) {
      spotifyApi.get("/me").then(({ data: { display_name, email, images, id } }) => {
        setStatus("authenticated");
        setUser({
          display_name,
          email,
          images,
          id,
        });
      });
    } else {
      setStatus("unauthenticated");
      user && setUser(undefined);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const signIn = () => {
  router.push("/api/auth/spotify/login");
};

export const signOut = (ctx?: Parameters<typeof nookies.destroy>[0]) => {
  nookies.destroy(ctx, "spotify.access_token");
  nookies.destroy(ctx, "spotify.refresh_token");
  if (typeof window !== undefined) {
    router.reload();
  }
};
