import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun, Languages } from "lucide-react";

/** Compact theme + RTL toggle. Persists via the preferences store. */
export function ThemeToggle() {
  const { theme, dir, toggleTheme, toggleDir } = useTheme();
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-muted text-foreground/80"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <button
        onClick={toggleDir}
        className="p-2 rounded-md hover:bg-muted text-foreground/80 flex items-center gap-1 text-xs font-medium"
        aria-label={`Switch to ${dir === "rtl" ? "LTR" : "RTL"}`}
        title={`Switch to ${dir === "rtl" ? "LTR" : "RTL"}`}
      >
        <Languages className="h-4 w-4" />
        <span className="hidden md:inline">{dir.toUpperCase()}</span>
      </button>
    </div>
  );
}
