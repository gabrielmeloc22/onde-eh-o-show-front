import * as RadixNav from "@radix-ui/react-navigation-menu";
import { styled } from "../../styles/stitches.config";
import { NavLink } from "./NavLink";

const NavRoot = styled(RadixNav.Root, {});
const NavList = styled(RadixNav.List, {});
const NavItem = styled(RadixNav.Item, {});

export function NavigationMenu() {
  return (
    <NavRoot
      css={{
        position: "relative",
        display: "flex",
        br: "$small",
        w: "fit-content",
        mx: "auto",
        mb: "$1",
        py: "$4",
        px: "$3",
        gap: "$3",
        bgColor: "$slate5",
        justifyContent: "center",
      }}
    >
      <NavList
        css={{
          position: "relative",
          display: "flex",
          gap: "$3",
          justifyContent: "center",
        }}
      >
        <NavItem>
          <NavLink href="/top-artists">Artistas favoritos</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/select-artists">Selecionar</NavLink>
        </NavItem>
      </NavList>
    </NavRoot>
  );
}
