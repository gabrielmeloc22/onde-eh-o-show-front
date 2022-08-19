import { createUtil } from "./helpers/createUtil";

export const utils = {
  m: createUtil<"margin">(
    "marginTop",
    "marginBottom",
    "marginLeft",
    "marginRight"
  ),
  mx: createUtil<"margin">("marginLeft", "marginRight"),
  my: createUtil<"margin">("marginTop", "marginBottom"),
  ml: createUtil<"margin">("marginLeft"),
  mt: createUtil<"margin">("marginTop"),
  mb: createUtil<"margin">("marginBottom"),
  mr: createUtil<"margin">("marginRight"),
  p: createUtil<"padding">(
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight"
  ),
  px: createUtil<"padding">("paddingLeft", "paddingRight"),
  py: createUtil<"padding">("paddingTop", "paddingBottom"),
  pl: createUtil<"padding">("paddingLeft"),
  pt: createUtil<"padding">("paddingTop"),
  pb: createUtil<"padding">("paddingBottom"),
  pr: createUtil<"padding">("paddingRight"),
  w: createUtil<"width">("width"),
  h: createUtil<"height">("height"),
  maxW: createUtil<"maxWidth">("maxWidth"),
  minW: createUtil<"minWidth">("minWidth"),
  maxH: createUtil<"maxHeight">("maxHeight"),
  minH: createUtil<"minHeight">("minHeight"),
  br: createUtil<"borderRadius">("borderRadius"),
  bgColor: createUtil<"backgroundColor">("backgroundColor"),
  flexDir: createUtil<"flexDirection">("flexDirection"),
};
