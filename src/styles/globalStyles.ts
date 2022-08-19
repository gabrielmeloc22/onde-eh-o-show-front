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
    my: 0
  }
});
