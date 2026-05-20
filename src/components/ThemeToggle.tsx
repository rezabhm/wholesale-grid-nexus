import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

/** Compact theme toggle. Persists via the preferences store. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 text-foreground/80"
      aria-label={`${t("header.theme")}: ${theme === "dark" ? "light" : "dark"}`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
