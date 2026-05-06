import { createContext, useContext, useEffect } from "react";
import { usePreferences } from "@/store/preferences";

type ThemeContextValue = {
  theme: "light" | "dark";
  dir: "ltr" | "rtl";
  toggleTheme: () => void;
  toggleDir: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, dir, setTheme, setDir } = usePreferences();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("dir", dir);
    root.setAttribute("lang", dir === "rtl" ? "fa" : "en");
  }, [theme, dir]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        dir,
        toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
        toggleDir: () => setDir(dir === "rtl" ? "ltr" : "rtl"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
