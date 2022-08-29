import * as DialogPrimitive from "@radix-ui/react-dialog";
import { createContext, useContext, useState } from "react";

interface DrawerContextValue {
  open: boolean;
}

const DrawerRoot = DialogPrimitive.Root;
const DrawerContext = createContext({} as DrawerContextValue);

export function Drawer({ children, ...props }: DialogPrimitive.DialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot open={open} onOpenChange={setOpen} {...props}>
      <DrawerContext.Provider value={{ open }}>{children}</DrawerContext.Provider>
    </DrawerRoot>
  );
}

export const useDrawer = () => {
  return useContext(DrawerContext);
};
