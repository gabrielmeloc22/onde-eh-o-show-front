import { keyframes, PropertyValue } from "@stitches/react";
import { CircleNotch } from "phosphor-react";
import { ComponentPropsWithRef, forwardRef } from "react";
import { config } from "../../styles/stitches.config";
import { Box } from "../Primitives";

const spinAnimation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const sizeMap = new Map([
  ["small", "1rem"],
  ["medium", "1.5rem"],
  ["large", "2rem"],
]);

interface SpinnerProps extends Omit<ComponentPropsWithRef<typeof Box>, "color"> {
  size?: "small" | "medium" | "large" | string | number;
  weight?: "thin" | "regular" | "bold";
  color?: PropertyValue<"color", typeof config>;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { css, color = "$primary12", size = "medium", weight = "regular", ...props },
  ref
) {
  const sizeProp = sizeMap.get(String(size)) ?? size;

  return (
    <Box
      ref={ref}
      role="alert"
      aria-label="carregando conteúdo"
      aria-live="assertive"
      css={{
        ...css,
        display: "flex",
        alignItems: "center",
        color,
        justifyContent: "center",
        animation: `${spinAnimation} 1s linear infinite`,
      }}
      {...props}
    >
      <CircleNotch size={sizeProp} weight={weight} />
    </Box>
  );
});
