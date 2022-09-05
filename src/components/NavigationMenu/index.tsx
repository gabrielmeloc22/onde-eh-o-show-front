import * as RadixNav from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { styled } from "../../styles/stitches.config";
import { useNav } from "./NavContext";

const NavRoot = styled(RadixNav.Root, {
  position: "relative",
  h: "fit-content",
  w: "fit-content",
  br: "$small",
  mx: "auto",
  px: "$3",
  bgColor: "$slate3",
});
const NavList = styled(RadixNav.List, {
  display: "flex",
  position: "relative",
  justifyContent: "center",
});

const Hover = styled(motion.div, {
  position: "absolute",
  top: "50%",
  left: "1rem",
  height: "65%",
  bgColor: "$primary5",
  br: "$small",
});

type NavigationMenuProps = React.ComponentPropsWithRef<typeof NavRoot>;

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(function NavigationMenu(
  { css, children, ...props },
  ref
) {
  const { hover, setHover } = useNav();

  return (
    <NavRoot
      css={css}
      ref={ref}
      {...props}
      onMouseLeave={() =>
        setHover((prev) => ({
          ...prev,
          opacity: 0,
          firstHover: true,
        }))
      }
    >
      <Hover
        aria-hidden
        initial={{ width: 0, x: 0, y: "-50%" }}
        animate={{
          width: hover.width,
          x: hover.position,
          transition: {
            duration: hover.firstHover ? 0 : 0.2,
            ease: [0.17, 0.88, 0.59, 0.89],
          },
        }}
        css={{
          opacity: hover.opacity,
          transition: "opacity 0.2s ease-out",
        }}
      />
      <NavList>{children}</NavList>
    </NavRoot>
  );
});
