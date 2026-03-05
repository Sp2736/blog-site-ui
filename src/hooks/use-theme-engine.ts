
import { useState, createContext, useContext } from "react";

type ThemeType = "light" | "dark" | "cyberpunk" | "groovy" | "cosmic";

const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
}>({ theme: "botanical", setTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);