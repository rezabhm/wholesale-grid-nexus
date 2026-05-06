import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-[hsl(var(--primary-hover))] shadow-sm",
  accent: "bg-brand-accent text-brand-accent-foreground hover:opacity-90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-muted border border-border",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline: "bg-transparent text-foreground border border-border hover:border-primary hover:text-primary",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90",
};
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export type BBButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  loading?: boolean;
};

export const BBButton = forwardRef<HTMLButtonElement, BBButtonProps>(
  ({ variant = "primary", size = "md", full, loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        variants[variant],
        sizes[size],
        full && "w-full",
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  ),
);
BBButton.displayName = "BBButton";
