import { styled } from "@stitches/react";

export const Link = styled("a", {
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
  variants: {
    color: {
      primary: {
        color: "$primary10",
        "&:hover": {
          color: "$primary11",
        },
      },
      neutral: {
        color: "$slate11",
        "&:hover": {
          color: "$slate11",
        },
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
