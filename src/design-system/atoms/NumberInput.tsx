import { forwardRef } from "react";
import { TextInput, type TextInputProps } from "./TextInput";

export type NumberInputProps = Omit<TextInputProps, "type"> & { min?: number; max?: number; step?: number };

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => (
  <TextInput ref={ref} type="number" inputMode="numeric" {...props} />
));
NumberInput.displayName = "NumberInput";
