import { useAuth } from "../../contexts/auth";
import { Box, Heading } from "../Primitives";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Profile } from "./Profile";

export function Header() {
  const { status, user } = useAuth();

  return (
    <Box
      as="header"
      css={{
        display: "flex",
        alignItems: "center",
        minHeight: "15vh",
      }}
    >
      <Box
        css={{
          width: "100%",
          maxWidth: "1280px",
          mx: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Heading
          css={{
            mr: "auto",
          }}
        >
          Onde é o Show
        </Heading>
        <Box
          css={{
            display: "flex",
            gap: "$6",
            alignItems: "center",
          }}
        >
          <ThemeSwitcher />
          {status === "authenticated" && <Profile />}
        </Box>
      </Box>
    </Box>
  );
}
