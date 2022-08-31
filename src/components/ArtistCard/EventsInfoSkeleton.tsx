import { motion } from "framer-motion";
import { ComponentProps } from "react";
import { styled } from "../../styles/stitches.config";
import { Skeleton } from "../Skeleton";

const Wrapper = styled(motion.div, {
  display: "grid",
  gridTemplateColumns: "3fr 1fr",
  gap: "$3",
});

type EventsInfoProps = ComponentProps<typeof Wrapper>;

export function EventsInfoSkeleton({ ...props }: EventsInfoProps) {
  return (
    <Wrapper {...props}>
      <Skeleton width="90%" height="1.75rem" />
      <Skeleton width="100%" height="1.75rem" />
      <Skeleton width="60%" height="1.25rem" />
      <Skeleton width="100%" height="1.25rem" />
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
