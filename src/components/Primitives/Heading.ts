import { styled } from "../../styles/stitches.config";

export const Heading = styled("h1", {
  fontFamily: "$mono",
  defaultVariants: {
    size: "medium",
  },
  variants: {
    size: {
      small: {
        fontSize: "x-large",
      },
      medium: {
        fontSize: "xx-large",
      },
      large: {
        fontSize: "xxx-large",
      },
    },
  },
});
