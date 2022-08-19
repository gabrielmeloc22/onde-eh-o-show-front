import { styled } from "../../styles/stitches.config";

export const Button = styled("button", {
  fontFamily: "$mono",
  appearance: "none",
  backgroundColor: "$color.primary",
  border: "none",
  br: "$small",
  "&:hover": {
    cursor: "pointer",
  },
  transition: "all 0.2s ease-in-out",

  defaultVariants: {
    size: "medium",
    color: "primary",
    type: "normal",
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
      normal: {},
      ghost: {
        height: "fit-content",
        width: "fit-content",
        backgroundColor: "transparent",
        padding: 0,
      },
      icon: {
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
        backgroundColor: "$primary5",
        "&:hover": {
          backgroundColor: "$primary6",
        },
      },
    },
  },
});
