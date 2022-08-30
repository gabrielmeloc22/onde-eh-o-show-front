import * as PopoverPrimitive from "@radix-ui/react-popover";
import { styled } from "../../styles/stitches.config";
import { Button } from "../Primitives";

const PopoverTriggerPrimitive = styled(PopoverPrimitive.Trigger, Button);

type PopoverTriggerProps = React.ComponentProps<typeof PopoverTriggerPrimitive>;

export function PopoverTrigger({ children, ...props }: PopoverTriggerProps) {
  return (
    <PopoverTriggerPrimitive type="ghost" {...props}>
      {children}
    </PopoverTriggerPrimitive>
  );
}
