import * as PopoverPrimitive from "@radix-ui/react-popover";
import { createContext, useContext, useState } from "react";

interface PopoverContextValue {
  open: boolean;
}

const PopoverRoot = PopoverPrimitive.Root;
const PopoverContext = createContext<PopoverContextValue>({} as PopoverContextValue);

export function Popover({ children, ...props }: PopoverPrimitive.PopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopoverRoot open={open} onOpenChange={setOpen} {...props}>
      <PopoverContext.Provider value={{ open }}>{children}</PopoverContext.Provider>
    </PopoverRoot>
  );
}

export const usePopover = () => {
  return useContext(PopoverContext);
};
