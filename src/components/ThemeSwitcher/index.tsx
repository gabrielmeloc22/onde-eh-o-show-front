import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
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
      css={{
        display: "flex",
        alignItems: "center",
        gap: "$3",
        color: "$slate11",
      }}
    >
      {theme === "dark" ? <MoonIcon width={17} height={17} /> : <SunIcon width={17} height={17} />}
      <Switch checked={theme === "dark"} onClick={() => setTheme(theme === "light" ? "dark" : "light")} />
    </Box>
  );
}
