import { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/store/preferences";
import { SUPPORTED_LANGUAGES } from "@/i18n";

type Locale = "en" | "fa" | "zh";

type ThemeContextValue = {
  theme: "light" | "dark";
  dir: "ltr" | "rtl";
  locale: Locale;
  toggleTheme: () => void;
  toggleDir: () => void;
  setLocale: (l: Locale) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, dir, locale, setTheme, setDir, setLocale } = usePreferences();
  const { i18n } = useTranslation();

  // Keep i18next + <html dir/lang> in sync with the persisted locale.
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
    const meta = SUPPORTED_LANGUAGES.find((l) => l.code === locale);
    if (meta) setDir(meta.dir);
  }, [locale, i18n, setDir]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("dir", dir);
    root.setAttribute("lang", locale);
  }, [theme, dir, locale]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        dir,
        locale,
        toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
        toggleDir: () => setDir(dir === "rtl" ? "ltr" : "rtl"),
        setLocale: (l) => setLocale(l),
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
