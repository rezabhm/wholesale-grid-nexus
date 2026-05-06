/**
 * Design tokens — single source of truth.
 * Consumed by Tailwind via CSS variables (see index.css) and by JS at runtime.
 */
export const tokens = {
  color: {
    brand: { 50: "230 65% 96%", 500: "230 65% 32%", 600: "230 65% 27%" },
    accent: { 500: "22 95% 55%" },
    success: "152 60% 36%",
    warning: "38 92% 50%",
    danger: "0 72% 51%",
  },
  radius: { sm: "0.25rem", md: "0.5rem", lg: "0.625rem", xl: "1rem" },
  spacing: { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2.5rem" },
  font: {
    family: { sans: "Inter, ui-sans-serif, system-ui, sans-serif" },
    size: { xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem", xl: "1.25rem", "2xl": "1.5rem" },
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  shadow: {
    sm: "0 1px 2px 0 hsl(220 40% 20% / 0.04)",
    md: "0 4px 12px -2px hsl(220 40% 20% / 0.06)",
    lg: "0 12px 32px -8px hsl(220 40% 20% / 0.10)",
  },
} as const;

export type Tokens = typeof tokens;
