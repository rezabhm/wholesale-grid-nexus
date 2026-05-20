import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/ThemeProvider";
import { SUPPORTED_LANGUAGES } from "@/i18n";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTheme();
  const { t } = useTranslation();
  const current = SUPPORTED_LANGUAGES.find((l) => l.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 h-9 px-2.5 text-foreground/80 hover:text-foreground"
          aria-label={t("header.language")}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline text-xs font-medium uppercase">{current?.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{t("header.language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORTED_LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code as "en" | "fa" | "zh")}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex flex-col">
              <span className="text-sm">{l.native}</span>
              <span className="text-[11px] text-muted-foreground">{l.label}</span>
            </span>
            {l.code === locale && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
