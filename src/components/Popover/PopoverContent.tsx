import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CSS } from "@stitches/react";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";
import { config, styled } from "../../styles/stitches.config";
import { usePopover } from "./Popover";

const PortalPrimitive = PopoverPrimitive.Portal;
const ContentPrimitive = styled(PopoverPrimitive.Content);
const ContentWrapper = styled(motion.div);

interface PopoverContentProps extends PopoverPrimitive.PopoverContentProps {
  css?: CSS<typeof config>;
  animation?: Pick<ComponentPropsWithoutRef<typeof ContentWrapper>, "initial" | "animate" | "exit">;
}

export function PopoverContent({ animation, css, children, ...props }: PopoverContentProps) {
  const { open } = usePopover();

  return (
    <AnimatePresence>
      {open && (
        <PortalPrimitive forceMount>
          <ContentPrimitive {...props} asChild>
            <ContentWrapper css={css} {...animation}>
              {children}
            </ContentWrapper>
          </ContentPrimitive>
        </PortalPrimitive>
      )}
    </AnimatePresence>
  );
}
