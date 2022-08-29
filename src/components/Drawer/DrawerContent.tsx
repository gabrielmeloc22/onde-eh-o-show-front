import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CSS } from "@stitches/react";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { config, styled } from "../../styles/stitches.config";
import { useDrawer } from "./Drawer";

const PortalPrimitive = DialogPrimitive.Portal;
const ContentPrimitive = DialogPrimitive.Content;
const OverlayPrimitive = DialogPrimitive.Overlay;
const Overlay = styled(motion.div, {
  position: "fixed",
  inset: 0,
  bgColor: "hsla(0, 0%, 0%, 0.7)",
});

const ContentWrapper = styled(motion.div, {
  position: "fixed",
  bgColor: "$slate2",
});

const slideVariants = {
  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
};

const positionVariants = {
  top: {
    top: 0,
    left: 0,
    right: 0,
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  left: {
    top: 0,
    left: 0,
    bottom: 0,
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
  },
};

const transition: Transition = {
  duration: 0.3,
  ease: [0.2, 0, 0.2, 1],
};

interface DrawerContentProps extends DialogPrimitive.DialogProps {
  position?: "left" | "right" | "top" | "bottom";
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  css?: CSS<typeof config>;
}

export function DrawerContent({
  css,
  width = "100%",
  height = "100%",
  maxWidth,
  maxHeight,
  position = "right",
  children,
  ...props
}: DrawerContentProps) {
  const { open } = useDrawer();

  return (
    <PortalPrimitive forceMount>
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
            <ContentPrimitive asChild {...props}>
              <ContentWrapper
                key="drawer"
                css={{
                  ...css,
                  ...positionVariants[position],
                  w: width,
                  h: height,
                  maxW: maxWidth,
                  maxH: maxHeight,
                }}
                initial={slideVariants[position].initial}
                animate={{
                  ...slideVariants[position].animate,
                  transition,
                }}
                exit={{ ...slideVariants[position].exit, transition }}
              >
                {children}
              </ContentWrapper>
            </ContentPrimitive>
          </>
        )}
      </AnimatePresence>
    </PortalPrimitive>
  );
}
