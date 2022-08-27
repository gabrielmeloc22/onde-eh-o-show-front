import { slate } from "@radix-ui/colors";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import { ComponentPropsWithRef } from "react";
import { styled } from "../../styles/stitches.config";

const SwitchRoot = styled(SwitchPrimitive.Root, {
  position: "relative",
  display: "inline-block",
  border: "none",
  width: "3rem",
  height: "1.75rem",
  br: "$round",
  bgColor: "$slate8",
  "&:hover": {
    cursor: "pointer",
  },
  "&[data-state='checked']": {
    bgColor: "$primary8",
  },
});
const SwitchThumb = SwitchPrimitive.Thumb;

const SwitchIndicator = styled(motion.div, {
  position: "absolute",
  inset: 0,
  top: "0.125rem",
  left: "0.15rem",
  display: "block",
  width: "1.5rem",
  height: "1.5rem",
  br: "$round",
  bgColor: slate.slate1,
});

interface SwitchProps extends ComponentPropsWithRef<typeof SwitchRoot> {}

export function Switch({ css, ...props }: SwitchProps) {
  return (
    <SwitchRoot {...props}>
      <SwitchThumb asChild>
        <SwitchIndicator
          css={css}
          animate={{
            x: props.checked ? "1.2rem" : 0,
            transition: { duration: 0.2 },
          }}
        />
      </SwitchThumb>
    </SwitchRoot>
  );
}
