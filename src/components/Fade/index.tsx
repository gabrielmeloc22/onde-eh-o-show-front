import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import { styled } from "../../styles/stitches.config";

const Wrapper = styled(motion.div);

interface FadeProps extends React.ComponentProps<typeof Wrapper> {
  in?: boolean;
  duration?: number;
}

export const Fade = forwardRef<HTMLDivElement, FadeProps>(
  ({ in: isOpen = true, duration = 0.5, children, ...props }, ref) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <Wrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration } }}
            exit={{
              opacity: 0,
              transition: {
                duration,
              },
            }}
            {...props}
            ref={ref}
          >
            {children}
          </Wrapper>
        )}
      </AnimatePresence>
    );
  }
);
