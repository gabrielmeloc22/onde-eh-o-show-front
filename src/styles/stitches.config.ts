import { indigo, indigoDark, slate, slateDark, whiteA } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";
import { aliasColorScheme } from "./helpers/aliasColorScheme";
import { utils } from "./utils";

export const { styled, createTheme, getCssText, globalCss, config } =
  createStitches({
    utils,
    media: {
      bp1: "(min-width: 375px)",
      bp2: "(min-width: 640px)",
      bp3: "(min-width: 768px)",
      bp4: "(min-width: 1024px)",
    },
    theme: {
      fonts: {
        mono: "Roboto Mono, monospace",
      },
      radii: {
        small: "0.5rem",
        medium: "1rem",
        round: "9999px",
      },
      space: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "2rem",
        6: "3rem",
        7: "3.5rem",
        8: "4rem",
        9: "5rem",
        10: "6rem",
      },
      colors: {
        text: slate.slate12,
        background: slate.slate1,
        ...slate,
        ...aliasColorScheme("primary", indigo),
        ...whiteA,
      },
    },
  });

export const darkTheme = createTheme({
  colors: {
    text: "white",
    background: slateDark.slate1,
    ...slateDark,
    ...aliasColorScheme("primary", indigoDark),
    ...whiteA,
  },
});
