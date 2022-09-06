import { motion } from "framer-motion";
import { ComponentProps } from "react";
import { styled } from "../../styles/stitches.config";
import { Skeleton } from "../Skeleton";

const Wrapper = styled(motion.div, {
  display: "grid",
  gridTemplateColumns: "7fr 4fr",
  gap: "calc($3 - 0.125rem)",
});

type EventsInfoProps = ComponentProps<typeof Wrapper>;

export function EventsInfoSkeleton({ ...props }: EventsInfoProps) {
  return (
    <Wrapper {...props}>
      {new Array(6).fill(0).map((_, i) => (
        <Skeleton key={i} height="1rem" width="100%" />
      ))}
      <Skeleton
        css={{
          mt: "$4",
        }}
        width="50%"
        height="2rem"
      />
      <Skeleton
        css={{
          mt: "$4",
        }}
        width="100%"
        height="2rem"
      />
    </Wrapper>
  );
}
