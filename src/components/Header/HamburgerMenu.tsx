import { ExitIcon, GearIcon, HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { signOut, useAuth } from "../../contexts/auth";
import { styled } from "../../styles/stitches.config";
import { Drawer, DrawerContent, DrawerTrigger } from "../Drawer";
import { Box, Button, Link as BaseLink } from "../Primitives";
import { ThemeSwitcher } from "../ThemeSwitcher";

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
        <HamburgerMenuIcon width={25} height={25} />
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
                <PersonIcon width={24} height={24} />
                Perfil
              </Link>
            </NextLink>
            <NextLink href="" passHref>
              <Link>
                <GearIcon width={24} height={24} />
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
              <ExitIcon width={24} height={24} />
              Sair
            </Link>
          </Box>
        )}
        <ThemeSwitcher />
      </DrawerContent>
    </Drawer>
  );
}
