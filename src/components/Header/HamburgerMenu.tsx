import NextLink from "next/link";
import { Gear, List, SignOut, User } from "phosphor-react";
import { signOut, useAuth } from "../../contexts/auth";
import { styled } from "../../styles/stitches.config";
import { Drawer, DrawerContent, DrawerTrigger } from "../Drawer";
import { Box, Button, Link as BaseLink } from "../Primitives";
import { ThemeSwitch } from "../ThemeSwitch";

const Link = styled(BaseLink, {
  display: "flex",
  alignItems: "center",
  gap: "$3",
  defaultVariants: {
    color: "neutral",
  },
});

export function HamburgerMenu() {
  const { status } = useAuth();

  return (
    <Drawer>
      <DrawerTrigger>
        <List size="1.6rem" />
      </DrawerTrigger>
      <DrawerContent
        width="80vw"
        maxWidth="300px"
        css={{
          py: "$6",
          px: "$5",
          display: "flex",
          flexDir: "column",
          gap: "$6",
          alignItems: "flex-start",
        }}
      >
        {status === "authenticated" && (
          <Box
            css={{
              display: "flex",
              flexDir: "column",
              gap: "$5",
            }}
          >
            <NextLink href="" passHref>
              <Link>
                <User size="1.5rem" />
                Perfil
              </Link>
            </NextLink>
            <NextLink href="" passHref>
              <Link>
                <Gear size="1.5rem" />
                Configurações
              </Link>
            </NextLink>
            <Link
              as={Button}
              type="ghost"
              onClick={() => {
                signOut();
              }}
            >
              <SignOut size="1.5rem" />
              Sair
            </Link>
          </Box>
        )}
        <ThemeSwitch />
      </DrawerContent>
    </Drawer>
  );
}
