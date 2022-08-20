import { normalize } from "stitches-normalize-css";
import { globalCss } from "./stitches.config";

export const globalStyles = globalCss(...normalize, {
  body: {
    m: 0,
    p: 0,
    boxSizing: "border-box",
    fontFamily: "$mono",
    backgroundColor: "$background",
    color: "$slate12",
  },
  p: {
    mx: 0,
    my: 0,
  },
  li: {
    px: 0,
    py: 0,
    mx: 0,
    my: 0,
  },
  ul: {
    px: 0,
    py: 0,
    mx: 0,
    my: 0,
    listStyle: "none",
  },
});
