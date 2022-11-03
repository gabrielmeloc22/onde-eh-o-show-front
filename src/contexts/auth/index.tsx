import { default as router } from "next/router";
import nookies from "nookies";
import { createContext, ReactNode, useContext } from "react";
import { useGetUserQuery } from "./useGetUserQuery";

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
  const { data: user, isSuccess, isFetched } = useGetUserQuery();

  let status: AuthContextData["status"] = "loading";
  isFetched && isSuccess ? (status = "authenticated") : (status = "unauthenticated");

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
