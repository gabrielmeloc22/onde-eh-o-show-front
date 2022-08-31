import { keyframes } from "@stitches/react";
import { BaseSyntheticEvent, ComponentPropsWithRef } from "react";
import { Text } from "../Primitives";

interface ScrollingTextProps extends ComponentPropsWithRef<typeof Text> {
  maxCharacters?: number;
  speed?: number;
}

export function ScrollingText({
  css,
  maxCharacters = 20,
  speed = 8,
  children,
  ...props
}: ScrollingTextProps) {
  function handleMouseEnter(e: BaseSyntheticEvent) {
    const target = e.target as HTMLParagraphElement;
    const { textContent } = e.target as HTMLParagraphElement;

    if (textContent?.length! > maxCharacters) {
      target.setAttribute("data-text-scroll", "true");
      target.setAttribute("data-text-content", target.textContent || "");
    }
  }

  function handleMouseLeave(e: BaseSyntheticEvent) {
    const target = e.target as HTMLParagraphElement;
    if (target.getAttribute("data-text-scroll") === "true") {
      target.removeAttribute("data-text-scroll");
      target.removeAttribute("data-text-content");
    }
  }
  const textScrollAnimation = keyframes({
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-110%)" },
  });
  return (
    <Text
      css={{
        ...css,
        w: "fit-content",
        maxWidth: `${maxCharacters}ch`,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "&[data-text-scroll]": {
          overflow: "visible",
          maxWidth: "max-content",
          "&:after": {
            content: "attr(data-text-content)",
            inset: 0,
            left: "110%",
            position: "absolute",
          },
          animation: `${textScrollAnimation} ${speed}s linear infinite`,
        },
      }}
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      {...props}
    >
      {children}
    </Text>
  );
}
