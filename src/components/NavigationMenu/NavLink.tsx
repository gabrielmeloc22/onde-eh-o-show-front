import { Link } from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { styled } from "../../styles/stitches.config";

const StyledNavLink = styled(Link, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  h: "100%",
  br: "$small",
  transition: "color 0.15s ease-out",
  zIndex: 1,
  color: "inherit",
  textDecoration: "none",
  "&[data-active]": {
    color: "$primary11",
    "&:after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      w: "100%",
      h: "0.125rem",
      bgColor: "$primary10",
    },
  },
});

interface NavlinkProps extends React.ComponentProps<typeof StyledNavLink> {
  href: string;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavlinkProps>(function NavLink(
  { href, children, css, ...props },
  ref
) {
  const router = useRouter();
  const isActive = href === router.asPath;

  return (
    <NextLink href={href} passHref>
      <StyledNavLink ref={ref} {...props} active={isActive}>
        {children}
      </StyledNavLink>
    </NextLink>
  );
});
