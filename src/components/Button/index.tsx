import { ComponentPropsWithRef, forwardRef } from "react";
import { Button as StyledButton } from "../Primitives";
import { Spinner } from "../Spinner";

interface ButtonProps extends ComponentPropsWithRef<typeof StyledButton> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { isLoading, ...props },
  ref
) {
  if (isLoading) {
    return (
      <StyledButton ref={ref} {...props} disabled>
        <Spinner size="small" />
      </StyledButton>
    );
  }

  return <StyledButton ref={ref} {...props} />;
});
