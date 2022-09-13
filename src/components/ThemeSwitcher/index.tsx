import { useTheme } from "next-themes";
import { Moon, Sun } from "phosphor-react";
import { useEffect, useState } from "react";
import { Box } from "../Primitives";
import { Switch } from "../Switch";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

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
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
      <Switch checked={theme === "dark"} onClick={() => setTheme(theme === "light" ? "dark" : "light")} />
    </Box>
  );
}
