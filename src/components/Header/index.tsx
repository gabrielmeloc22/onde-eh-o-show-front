import { ExitIcon } from "@radix-ui/react-icons";
import { signOut, useAuth } from "../../contexts/auth";
import { Box, Button, Heading } from "../Primitives";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function Header() {
  const { status } = useAuth();

  return (
    <Box
      as="header"
      css={{
        display: "flex",
        alignItems: 'center',
        minHeight: "15vh",
      }}
    >
      <Box
        css={{
          width: "100%",
          maxWidth: "1280px",
          mx:"auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Heading
          css={{
            mr:"auto",
          }}
        >
          Onde é o Show
        </Heading>
        <Box css={{
          display: "flex",
          gap: "$4",
        }}>
        <ThemeSwitcher />
        {status === 'authenticated' && (
          <Button
            type="icon"
            aria-label="Sair da sua conta"
            onClick={() => signOut()}
          >
            <ExitIcon />
          </Button>
        )}
      </Box>
      </Box>
    </Box>
  );
}
