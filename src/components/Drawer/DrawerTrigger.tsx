import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CSS } from "@stitches/react";
import { forwardRef } from "react";
import { config } from "../../styles/stitches.config";
import { Button } from "../Primitives";

const Trigger = DialogPrimitive.Trigger;
interface DrawerTriggerProps extends DialogPrimitive.DialogProps {
  css?: CSS<typeof config>;
}

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(function DrawerTrigger(
  { css, children, ...props },
  ref
) {
  return (
    <Trigger asChild {...props} ref={ref}>
      <Button color="neutral" type="ghost" css={css}>
        {children}
      </Button>
    </Trigger>
  );
});
