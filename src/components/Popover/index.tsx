import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styled } from "../../styles/stitches.config";
import { Popover } from "./Popover";
import { PopoverContent } from "./PopoverContent";
import { PopoverTrigger } from "./PopoverTrigger";

export const PopoverArrow = styled(PopoverPrimitive.Arrow);
export const PopoverClose = styled(PopoverPrimitive.PopoverClose, {
  position: "absolute",
  right: "$2",
  top: "$2",
});

export { PopoverContent, PopoverTrigger, Popover };
