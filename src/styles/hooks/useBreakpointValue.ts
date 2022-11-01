import { useEffect, useState } from "react";
import { config } from "../stitches.config";

type Breakpoints = Partial<Record<keyof typeof media, any>>;
type Breakpoint = keyof Breakpoints;
type breakpoints<T> = Partial<Breakpoints & { base: T }>;

const { media } = config;

const getMatchingBreakpoints = (breakpoints: Breakpoints) => {
  return Object.entries(breakpoints)
    .map(([key, val]) => {
      if (window.matchMedia(val).matches) {
        return key;
      }
    })
    .reverse() as Breakpoint[];
};

export const useBreakpointValue = <T = any>(breakpoints: breakpoints<T>) => {
  const [currBreakpoint, setCurrBreakpoint] = useState<Breakpoint | "base">("base");

  function handleChange() {
    const matchingBreakpoints = getMatchingBreakpoints(media);
    const breakpoint = matchingBreakpoints.find((bp) => Object.keys(breakpoints).includes(bp));
    breakpoint && setCurrBreakpoint(breakpoint);
  }

  useEffect(() => {
    handleChange();
    window.addEventListener("resize", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
    };
  }, []);

  return breakpoints[currBreakpoint] as T;
};
