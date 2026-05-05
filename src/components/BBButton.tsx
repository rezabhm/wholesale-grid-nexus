import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-[hsl(var(--primary-hover))]",
  secondary: "bg-secondary text-secondary-foreground hover:bg-surface-alt border border-border",
  ghost: "bg-transparent text-foreground hover:bg-surface-alt",
  outline: "bg-transparent text-primary border border-primary hover:bg-accent",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90",
};
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const BBButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; full?: boolean }>(
  ({ variant = "primary", size = "md", full, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none rounded-sm",
        variants[variant],
        sizes[size],
        full && "w-full",
        className,
      )}
      {...props}
    />
  ),
);
BBButton.displayName = "BBButton";
