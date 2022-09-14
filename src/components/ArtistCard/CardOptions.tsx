import { AnimatePresence, motion } from "framer-motion";
import { Bell, Heart } from "phosphor-react";
import { useBreakpointValue } from "../../styles/hooks/useBreakpointValue";
import { styled } from "../../styles/stitches.config";
import { Button } from "../Primitives";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger as OriginalTooltipTrigger,
} from "../Tooltip";

const Wrapper = styled(motion.div, {
  position: "absolute",
  display: "flex",
  flexDir: "column",
  gap: "$2",
  top: "$3",
  right: "$3",
  zIndex: 1,
});

const TooltipTrigger = styled(OriginalTooltipTrigger, Button, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  br: "$round",
  bgColor: "$slate3",
  "&:hover": {
    bgColor: "$slate4",
  },
  defaultVariants: {
    type: "icon",
    color: "neutral",
  },
});

interface CardOptions extends React.ComponentPropsWithRef<typeof Wrapper> {
  hover: boolean;
}

export function CardOptions({ hover, ...props }: CardOptions) {
  const isMobile = useBreakpointValue({
    base: true,
    bp3: false,
  });

  return (
    <AnimatePresence>
      {(hover || isMobile) && (
        <Wrapper
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
          {...props}
        >
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <Heart size="1.25rem" />
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={5}>
                Adicionar artista aos meus favoritos
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Bell size="1.25rem" />
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={5}>
                Ativar notificações
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}
