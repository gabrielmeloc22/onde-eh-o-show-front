import { motion } from "framer-motion";
import { ComponentProps } from "react";
import { styled } from "../../styles/stitches.config";
import { Skeleton } from "../Skeleton";

const Wrapper = styled(motion.div, {
  display: "flex",
  flexDir: "column",
  gap: "$3",
});

type EventsInfoProps = ComponentProps<typeof Wrapper>;

export function EventsInfoSkeleton({ ...props }: EventsInfoProps) {
  return (
    <Wrapper {...props}>
      <Skeleton width="100" height="1.155rem" />
      <Skeleton width="120%" height="1.155rem" />
      <Skeleton width="90%" height="1.155rem" />
      <Skeleton width="80%" height="1.155rem" />
      <Skeleton width="70%" height="1.155rem" />
    </Wrapper>
  );
}
