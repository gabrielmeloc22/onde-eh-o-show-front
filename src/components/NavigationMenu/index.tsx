import * as RadixNav from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { styled } from "../../styles/stitches.config";

export const NavRoot = styled(RadixNav.Root, {});
export const NavList = styled(RadixNav.List, {});
export const NavItem = styled(RadixNav.Item, {});
export const NavLink = styled(RadixNav.Link, {});

// Todo: add styles and logic

export function NavigationMenu() {
  return (
    <NavRoot
      css={{
        bgColor: "$slate5",
      }}
    >
      <NavList>
        <NavItem>
          <NextLink href="/" passHref>
            <NavLink>Something</NavLink>
          </NextLink>
        </NavItem>
      </NavList>
    </NavRoot>
  );
}
