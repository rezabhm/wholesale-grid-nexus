import type { ReactNode } from "react";
import { FormProvider, type UseFormReturn, type FieldValues } from "react-hook-form";

type FormWrapperProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void | Promise<void>;
  children: ReactNode;
  className?: string;
};

/** Thin wrapper that provides the RHF context and a typed submit handler. */
export function FormWrapper<T extends FieldValues>({ form, onSubmit, children, className }: FormWrapperProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}
