import { ComponentProps, CSS, keyframes, PropertyValue } from "@stitches/react";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import { config, styled } from "../../styles/stitches.config";

const Wrapper = styled(motion.div);

const skeletonAnimation = keyframes({
  "0%": {
    backgroundPositionX: "right",
  },
  "100%": {
    backgroundPositionX: "left",
  },
});

const skeletonStyle: CSS = {
  backgroundClip: "padding-box",
  backgroundSize: "600%",
  backgroundImage:
    "linear-gradient(to right, $slate8 20%, $slate6 50%, $slate8 80%)",
  animation: `${skeletonAnimation} 1.3s ease-out infinite`,
  cursor: "default",
  color: "transparent",
  pointerEvents: "none",
  userSelect: "none",
  "&::before, &::after, *": {
    visibility: "hidden",
  },
};

interface SkeletonProps extends React.ComponentPropsWithRef<typeof Wrapper> {
  isLoaded?: boolean;
  fadeDuration?: number;
  width?: PropertyValue<"width", typeof config>;
  height?: PropertyValue<"height", typeof config>;
  customSkeleton?: ({
    ...props
  }: ComponentProps<typeof Wrapper>) => JSX.Element;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      isLoaded = false,
      fadeDuration = 0.5,
      width = "fit-content",
      height = "fit-content",
      customSkeleton: CustomSkeleton,
      css,
      ...props
    },
    ref
  ) {
    if (!CustomSkeleton) {
      return (
        <AnimatePresence mode="wait">
          {!isLoaded ? (
            <Wrapper
              key="skeleton"
              initial={false}
              exit={{
                opacity: 0,
                transition: { duration: fadeDuration / 2 },
              }}
              css={{
                ...css,
                ...skeletonStyle,
                width,
                height,
              }}
              ref={ref}
              {...props}
            />
          ) : (
            <Wrapper
              key="content"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: fadeDuration / 2 },
              }}
              ref={ref}
              css={css}
              {...props}
            />
          )}
        </AnimatePresence>
      );
    }
    return (
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <CustomSkeleton
            key="skeleton"
            initial={false}
            exit={{
              opacity: 0,
              transition: { duration: fadeDuration / 2 },
            }}
            css={css}
            ref={ref}
            {...props}
          />
        ) : (
          <Wrapper
            key="content"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: fadeDuration / 2 },
            }}
            ref={ref}
            css={css}
            {...props}
          />
        )}
      </AnimatePresence>
    );
  }
);
