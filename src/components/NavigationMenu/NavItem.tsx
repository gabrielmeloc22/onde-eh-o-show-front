import * as NavPrimitive from "@radix-ui/react-navigation-menu";
import { forwardRef, useRef } from "react";
import { styled } from "../../styles/stitches.config";
import { useNav } from "./NavContext";

const Item = styled(NavPrimitive.Item);
const Wrapper = styled("li", {
  transition: "color 0.2s ease-out",
  color: "$slate11",
  "&:hover": {
    color: "$primary11",
    cursor: "pointer",
  },
});

type NavItemProps = React.ComponentPropsWithoutRef<typeof Item>;

export const NavItem = forwardRef<HTMLLIElement, NavItemProps>(function NavItem(
  { css, value, children, ...props },
  forwardedRef
) {
  const { setHover } = useNav();
  const wrapperRef = useRef<HTMLLIElement>(null);

  function handleMouseEnter() {
    const { offsetLeft, offsetWidth } = wrapperRef.current as HTMLLIElement;
    setHover(({ opacity: prevOpacity }) => {
      return {
        position: offsetLeft,
        width: offsetWidth,
        firstHover: prevOpacity === 0,
        opacity: 1,
      };
    });
  }

  return (
    <Item ref={forwardedRef} {...props} asChild>
      <Wrapper css={css} ref={wrapperRef} onMouseEnter={handleMouseEnter}>
        {children}
      </Wrapper>
    </Item>
  );
});
