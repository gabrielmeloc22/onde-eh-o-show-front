import { styled } from "../../styles/stitches.config";

export const Button = styled("button", {
  w: "fit-content",
  h: "fit-content",
  fontFamily: "$mono",
  appearance: "none",
  border: "none",
  br: "$small",
  "&:hover": {
    cursor: "pointer",
  },
  transition: "all 0.2s ease-in-out",

  defaultVariants: {
    size: "medium",
    color: "primary",
  },

  variants: {
    size: {
      small: {
        fontSize: "0.85rem",
        py: "$2",
        px: "$2",
      },
      medium: {
        fontSize: "medium",
        py: "$2",
        px: "$3",
      },
      large: {
        fontSize: "medium",
        py: "$3",
        px: "$4",
      },
    },
    type: {
      ghost: {
        height: "fit-content",
        width: "fit-content",
        bgColor: "transparent",
        padding: 0,
        "&:hover": {
          bgColor: "transparent",
        },
      },
      icon: {
        bgColor: "$primary5",
        "&:hover": {
          bgColor: "$primary6",
        },
        height: "fit-content",
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: "1rem",
      },
    },
    color: {
      primary: {
        color: "$primary11",
        bgColor: "$primary5",
        "&:hover": {
          color: "$primary11",
          bgColor: "$primary6",
        },
      },
      neutral: {
        color: "$slate11",
        bgColor: "$slate5",
        "&:hover": {
          color: "$slate11",
          bgColor: "$slate7",
        },
      },
    },
  },

  compoundVariants: [
    {
      type: "ghost",
      css: {
        bgColor: "transparent",
        "&:hover": {
          bgColor: "transparent",
        },
      },
    },
  ],
});
