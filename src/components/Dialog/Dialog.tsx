import * as DialogPrimitive from "@radix-ui/react-dialog";
import { createContext, useContext, useState } from "react";

const DialogRoot = DialogPrimitive.Root;

export const DialogClose = DialogPrimitive.Close;
interface DialogContextValue {
  open: boolean;
}

const DialogContext = createContext<DialogContextValue>({} as DialogContextValue);

export function Dialog({ children, ...props }: DialogPrimitive.DialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open }}>
      <DialogRoot onOpenChange={setOpen} open={open} {...props}>
        {children}
      </DialogRoot>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}
