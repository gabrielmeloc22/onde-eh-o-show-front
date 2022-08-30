import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ComponentPropsWithRef, forwardRef } from "react";
import { styled } from "../../styles/stitches.config";

const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: "flex",
  alignItems: "center",
});
const AvatarImage = styled(AvatarPrimitive.Image, {
  borderRadius: "50%",
  w: "3rem",
  h: "3rem",
});
const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  w: "3rem",
  h: "3rem",
  backgroundColor: "$slate8",
});

interface AvatarProps extends ComponentPropsWithRef<typeof AvatarRoot> {
  name: string;
  src?: string;
  width?: number | string;
  height?: number | string;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { width, height, css, name, src, ...props },
  ref
) {
  function getInitials(name: string) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  return (
    <AvatarRoot ref={ref} {...props}>
      <AvatarImage css={{ ...css, width, height }} src={src} />
      <AvatarFallback css={{ ...css, width, height }}>{getInitials(name)}</AvatarFallback>
    </AvatarRoot>
  );
});
