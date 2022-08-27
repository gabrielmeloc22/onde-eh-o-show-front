import * as AvatarPrimitive from "@radix-ui/react-avatar";
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

interface AvatarProps extends AvatarPrimitive.AvatarProps {
  name: string;
  src?: string;
  customFallback?: React.ReactElement;
}

export function Avatar({
  name,
  src,
  customFallback: CustomFallback,
  ...props
}: AvatarProps) {
  function getInitials(name: string) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  return (
    <AvatarRoot {...props}>
      <AvatarImage src={src} />
      <AvatarFallback>{CustomFallback || getInitials(name)}</AvatarFallback>
    </AvatarRoot>
  );
}
