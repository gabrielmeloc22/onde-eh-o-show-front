import { MagnifyingGlass } from "phosphor-react";
import { ComponentPropsWithRef, useEffect, useRef } from "react";
import { DebounceInput } from "react-debounce-input";
import { styled } from "../../styles/stitches.config";
import { Box } from "../Primitives";

const Input = styled(DebounceInput, {
  w: "100%",
  fontSize: "$3",
  fontFamily: "$mono",
  br: "$round",
  pr: "$6",
  py: "$2",
  px: "$4",
  border: "2px solid $slate6",
  bgColor: "transparent",
  "&:focus-visible": {
    outline: "2px solid $primary10",
    outlineOffset: "-1px",
  },
});

interface SearchBoxProps extends ComponentPropsWithRef<typeof Input> {}

export function SearchBox({ onChange, ...props }: SearchBoxProps) {
  const searchLabelRef = useRef<HTMLLabelElement>(null);
  useEffect(() => {
    searchLabelRef.current?.focus();
  }, []);

  return (
    <Box
      as="label"
      css={{
        w: "100%",
        position: "relative",
        maxWidth: "500px",
        alignSelf: "center",
      }}
      ref={searchLabelRef}
    >
      <Input
        aria-label="pesquisar artista"
        placeholder="Nome do artista"
        onChange={onChange}
        debounceTimeout={500}
        {...props}
      />
      <Box
        css={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          w: "fit-content",
          h: "fit-content",
          top: "50%",
          transform: "translateY(-50%)",
          right: "$3",
        }}
      >
        <MagnifyingGlass size={20} />
      </Box>
    </Box>
  );
}
