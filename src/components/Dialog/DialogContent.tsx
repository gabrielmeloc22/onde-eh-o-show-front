import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "../../styles/stitches.config";
import { useDialog } from "./Dialog";

const ContentPrimitive = DialogPrimitive.Content;
const OverlayPrimitive = DialogPrimitive.Overlay;
const Portal = DialogPrimitive.Portal;

const Content = styled(motion.div, {
  position: "fixed",
  top: "50%",
  left: "50%",
  w: "fit-content",
  h: "fit-content",
  bgColor: "$slate2",
});
const Overlay = styled(motion.div, {
  position: "fixed",
  inset: 0,
  bgColor: "hsla(0, 0%, 0%, 0.7)",
});

const transition = {
  duration: 0.2,
  ease: "easeOut",
};

type DialogContentProps = React.ComponentProps<typeof Content>;

export function DialogContent({ children, ...props }: DialogContentProps) {
  const { open } = useDialog();

  return (
    <Portal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <OverlayPrimitive asChild>
              <Overlay
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              />
            </OverlayPrimitive>
            <ContentPrimitive asChild>
              <Content
                initial={{
                  x: "-50%",
                  y: "-50%",
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition,
                }}
                {...props}
              >
                {children}
              </Content>
            </ContentPrimitive>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
