import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styled } from "../../styles/stitches.config";

export const PopoverArrow = styled(PopoverPrimitive.Arrow);
export const PopoverClose = styled(PopoverPrimitive.PopoverClose, {
  position: "absolute",
  right: "$2",
  top: "$2",
});

const PopoverRoot = PopoverPrimitive.Root;
const PopoverPortal = PopoverPrimitive.Portal;
const PopoverTrigger = styled(PopoverPrimitive.Trigger, {
  display: "inline-block",
  position: "relative",
  px: "0",
  py: "0",
  w: "fit-content",
  h: "fit-content",
  border: "none",
  bgColor: "transparent",
  "&:hover": {
    cursor: "pointer",
  },
});
const PopoverContent = PopoverPrimitive.Content;

interface PopoverProps extends PopoverPrimitive.PopoverProps {
  trigger: JSX.Element;
  portal?: boolean;
  align?: "start" | "center" | "end";
}

export function Popover({
  trigger,
  children,
  portal = false,
  align = "center",
  ...props
}: PopoverProps) {
  return (
    <PopoverRoot {...props}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      {portal ? (
        <PopoverPortal>
          <PopoverContent align={align} asChild>
            {children}
          </PopoverContent>
        </PopoverPortal>
      ) : (
        <PopoverContent align={align} asChild>
          {children}
        </PopoverContent>
      )}
    </PopoverRoot>
  );
}
