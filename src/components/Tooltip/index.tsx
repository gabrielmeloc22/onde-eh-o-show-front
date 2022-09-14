import { Root as TooltipRoot, TooltipProps, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { createContext, useContext, useState } from "react";
import { TooltipContent } from "./TooltipContent";

interface TooltipContextData {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = createContext({} as TooltipContextData);

function Tooltip({ children, ...props }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <TooltipRoot open={open} onOpenChange={setOpen} {...props}>
        {children}
      </TooltipRoot>
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  return useContext(TooltipContext);
}

export { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip };
