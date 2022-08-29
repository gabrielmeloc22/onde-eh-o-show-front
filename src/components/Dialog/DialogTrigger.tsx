import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "../../styles/stitches.config";
import { Button } from "../Primitives";

const Trigger = styled(DialogPrimitive.Trigger, Button);

type DrawerTriggerProps = React.ComponentProps<typeof Trigger>;

export function DialogTrigger({ children, ...props }: DrawerTriggerProps) {
  return <Trigger {...props}>{children}</Trigger>;
}
