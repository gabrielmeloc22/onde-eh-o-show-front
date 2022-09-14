import {
  TooltipContent as ContentPrimitive,
  TooltipContentImplProps,
  TooltipPortal,
} from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import { useTooltip } from ".";
import { styled } from "../../styles/stitches.config";

const ContentWrapper = styled(motion.div, {
  display: "flex",
  w: "fit-content",
  h: "fit-content",
  py: "$2",
  px: "calc($2 + 0.125rem)",
  br: "$small",
  bgColor: "$slate6",
  color: "$slate12",
  fontSize: "$small",
});

const animationPropsBySide = {
  top: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  },
  right: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  },
  bottom: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  left: {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  },
};

type TooltipContentProps = TooltipContentImplProps;

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { children, side = "top", ...props },
  ref
) {
  const { open } = useTooltip();
  const animationProps = animationPropsBySide[side];

  return (
    <AnimatePresence>
      <TooltipPortal forceMount>
        {open && (
          <ContentPrimitive side={side} asChild {...props}>
            <ContentWrapper
              ref={ref}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.6, 1],
              }}
              {...animationProps}
            >
              {children}
            </ContentWrapper>
          </ContentPrimitive>
        )}
      </TooltipPortal>
    </AnimatePresence>
  );
});
