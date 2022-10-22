import { styled } from "../../styles/stitches.config";
import { NavigationMenu } from "../NavigationMenu";
import { NavProvider } from "../NavigationMenu/NavContext";
import { NavItem as OriginalNavItem } from "../NavigationMenu/NavItem";
import { NavLink as OriginalNavLink } from "../NavigationMenu/NavLink";

const NavItem = styled(OriginalNavItem, {
  px: "$3",
});

const NavLink = styled(OriginalNavLink, {
  py: "calc($3 + 0.125rem)",
});

export function Nav() {
  return (
    <NavProvider>
      <NavigationMenu
        css={{
          mb: "$5",
        }}
      >
        <NavItem>
          <NavLink href="/top-artists">Favoritos</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/pesquisar">Pesquisar</NavLink>
        </NavItem>
      </NavigationMenu>
    </NavProvider>
  );
}
