import { z } from "zod";

export const emailLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export const phoneStartSchema = z.object({
  phone: z.string().min(7, "Enter a valid phone number").regex(/^\+?[0-9 ]+$/, "Digits only"),
});

export const otpVerifySchema = z.object({
  code: z.string().length(6, "6-digit code"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your name"),
    email: z.string().email(),
    phone: z.string().min(7),
    password: z.string().min(8, "At least 8 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Passwords don't match" });

export type EmailLoginInput = z.infer<typeof emailLoginSchema>;
export type PhoneStartInput = z.infer<typeof phoneStartSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
