import { createContext, useContext, useState } from "react";

type Hover = {
  position: number;
  width: number;
  firstHover: boolean;
  opacity: number;
};
interface NavContextData {
  hover: Hover;
  setHover: (hover: Hover | ((arg: Hover) => Hover)) => void;
}

interface NavProviderProps {
  children: React.ReactNode;
}

const NavContext = createContext({} as NavContextData);

export function NavProvider({ children }: NavProviderProps) {
  const [hover, setHover] = useState<Hover>({
    position: 0,
    width: 0,
    opacity: 0,
    firstHover: true,
  });

  return <NavContext.Provider value={{ hover, setHover }}>{children}</NavContext.Provider>;
}

export const useNav = () => {
  return useContext(NavContext);
};
