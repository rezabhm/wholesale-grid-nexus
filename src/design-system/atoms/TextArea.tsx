import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full min-h-[88px] px-3 py-2 text-sm bg-background border rounded-md outline-none transition-colors",
      "focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground",
      invalid ? "border-destructive" : "border-input",
      className,
    )}
    {...props}
  />
));
TextArea.displayName = "TextArea";
