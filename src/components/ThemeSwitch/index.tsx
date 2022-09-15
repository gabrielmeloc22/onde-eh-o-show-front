import { useTheme } from "next-themes";
import { Moon, Sun } from "phosphor-react";
import { useEffect, useState } from "react";
import { Box } from "../Primitives";
import { Switch } from "../Switch";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <Box
      as="label"
      aria-label="mudar modo de cor"
      css={{
        display: "flex",
        alignItems: "center",
        gap: "$3",
        color: "$slate11",
      }}
    >
      {resolvedTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
      <Switch
        checked={resolvedTheme === "dark"}
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      />
    </Box>
  );
}
