import router from "next/router";
import nookies, { parseCookies } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { spotifyApi } from "../../services/SpotifyAPI";

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
    const { "spotify.access_token": accessToken } = parseCookies(undefined);

    if (accessToken) {
      spotifyApi
        .get("/me")
        .then(({ data: { display_name, email, images, id } }) => {
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
  nookies.destroy(ctx ?? undefined, "spotify.access_token");
  nookies.destroy(ctx ?? undefined, "spotify.refresh_token");
  router.asPath !== "/" && router.push("/");
  router.reload();
};
