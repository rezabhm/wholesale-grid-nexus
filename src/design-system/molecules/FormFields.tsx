import type { ReactNode } from "react";
import { useFormContext, type FieldValues, type Path, Controller } from "react-hook-form";
import { TextInput, type TextInputProps } from "@/design-system/atoms/TextInput";
import { TextArea, type TextAreaProps } from "@/design-system/atoms/TextArea";
import { NumberInput, type NumberInputProps } from "@/design-system/atoms/NumberInput";

type FieldShellProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  required?: boolean;
};

export function FieldShell({ label, hint, error, required, children }: FieldShellProps) {
  return (
    <label className="block space-y-1.5">
      {label && (
        <span className="text-xs font-medium text-foreground flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </span>
      )}
      {children}
      {error ? (
        <span className="text-xs text-destructive">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

type CommonProps<T extends FieldValues> = { name: Path<T>; label?: ReactNode; hint?: ReactNode; required?: boolean };

export function FormInput<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  ...rest
}: CommonProps<T> & Omit<TextInputProps, "name">) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldShell label={label} hint={hint} required={required} error={fieldState.error?.message}>
          <TextInput {...rest} {...field} value={field.value ?? ""} invalid={!!fieldState.error} />
        </FieldShell>
      )}
    />
  );
}

export function FormTextArea<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  ...rest
}: CommonProps<T> & Omit<TextAreaProps, "name">) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldShell label={label} hint={hint} required={required} error={fieldState.error?.message}>
          <TextArea {...rest} {...field} value={field.value ?? ""} invalid={!!fieldState.error} />
        </FieldShell>
      )}
    />
  );
}

export function FormNumberInput<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  ...rest
}: CommonProps<T> & Omit<NumberInputProps, "name">) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldShell label={label} hint={hint} required={required} error={fieldState.error?.message}>
          <NumberInput
            {...rest}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
            invalid={!!fieldState.error}
          />
        </FieldShell>
      )}
    />
  );
}
