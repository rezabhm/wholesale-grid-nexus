import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
};

/** Headless-styled text input. Wrap with FormInput for RHF + Zod integration. */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, invalid, leading, trailing, ...props }, ref) => (
    <div
      className={cn(
        "flex items-center gap-2 h-10 px-3 bg-background border rounded-md transition-colors",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15",
        invalid ? "border-destructive" : "border-input",
        className,
      )}
    >
      {leading && <span className="text-muted-foreground shrink-0">{leading}</span>}
      <input
        ref={ref}
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        {...props}
      />
      {trailing && <span className="text-muted-foreground shrink-0">{trailing}</span>}
    </div>
  ),
);
TextInput.displayName = "TextInput";
