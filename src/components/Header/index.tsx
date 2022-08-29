import { useAuth } from "../../contexts/auth";
import { useBreakpointValue } from "../../styles/hooks/useBreakpointValue";
import { Box, Heading } from "../Primitives";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { HamburgerMenu } from "./HamburgerMenu";
import { Profile } from "./Profile";

export function Header() {
  const { status } = useAuth();
  const shouldShowDrawer = useBreakpointValue({
    base: true,
    bp3: false,
  });

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
        {shouldShowDrawer ? (
          <HamburgerMenu />
        ) : (
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
        )}
      </Box>
    </Box>
  );
}
