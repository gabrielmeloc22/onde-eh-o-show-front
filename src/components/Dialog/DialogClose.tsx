import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "../../styles/stitches.config";
import { Button } from "../Primitives";

const StyledDialogClose = styled(DialogPrimitive.Close, Button, {
  position: "absolute",
  top: "$4",
  right: "$4",
});

type DialogCloseProps = React.ComponentProps<typeof StyledDialogClose>;

export function DialogClose({ children, ...props }: DialogCloseProps) {
  return (
    <StyledDialogClose type="ghost" color="neutral" {...props}>
      {children}
    </StyledDialogClose>
  );
}
