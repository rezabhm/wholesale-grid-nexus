import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Smartphone, Package2, ShieldCheck, MessageSquare, BadgeCheck, ArrowLeft } from "lucide-react";
import { useAuth } from "@/store/auth";
import { BBButton } from "@/components/BBButton";
import { FormWrapper } from "@/design-system/molecules/FormWrapper";
import { FormInput } from "@/design-system/molecules/FormFields";
import {
  emailLoginSchema,
  phoneStartSchema,
  otpVerifySchema,
  registerSchema,
  type EmailLoginInput,
  type PhoneStartInput,
  type OtpVerifyInput,
  type RegisterInput,
} from "@/features/auth/schemas";

type Method = "email" | "otp" | "wechat";

function MethodTabs({ value, onChange }: { value: Method; onChange: (m: Method) => void }) {
  const tabs: { id: Method; label: string; icon: typeof Mail }[] = [
    { id: "email", label: "Email", icon: Mail },
    { id: "otp", label: "Phone OTP", icon: Phone },
    { id: "wechat", label: "WeChat", icon: Smartphone },
  ];
  return (
    <div className="grid grid-cols-3 p-1 bg-muted rounded-md mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`flex items-center justify-center gap-1.5 h-9 text-xs font-medium rounded-sm transition ${
            value === t.id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <t.icon className="h-3.5 w-3.5" /> {t.label}
        </button>
      ))}
    </div>
  );
}

function EmailLoginForm() {
  const loginWithEmail = useAuth((s) => s.loginWithEmail);
  const nav = useNavigate();
  const form = useForm<EmailLoginInput>({ resolver: zodResolver(emailLoginSchema), defaultValues: { email: "", password: "" } });
  return (
    <FormWrapper form={form} onSubmit={(v) => { loginWithEmail(v.email); nav("/dashboard"); }} className="space-y-4">
      <FormInput<EmailLoginInput> name="email" label="Business email" type="email" placeholder="you@company.com" required />
      <FormInput<EmailLoginInput> name="password" label="Password" type="password" placeholder="••••••••" required />
      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-1.5"><input type="checkbox" className="accent-primary" /> Remember me</label>
        <a className="text-primary hover:underline" href="#">Forgot password?</a>
      </div>
      <BBButton full size="lg" type="submit" loading={form.formState.isSubmitting}>Sign in</BBButton>
    </FormWrapper>
  );
}

function OtpFlow() {
  const loginWithPhone = useAuth((s) => s.loginWithPhone);
  const nav = useNavigate();
  const [phone, setPhone] = useState<string | null>(null);

  const phoneForm = useForm<PhoneStartInput>({ resolver: zodResolver(phoneStartSchema), defaultValues: { phone: "" } });
  const otpForm = useForm<OtpVerifyInput>({ resolver: zodResolver(otpVerifySchema), defaultValues: { code: "" } });

  if (!phone) {
    return (
      <FormWrapper form={phoneForm} onSubmit={(v) => setPhone(v.phone)} className="space-y-4">
        <FormInput<PhoneStartInput> name="phone" label="Phone number" placeholder="+86 138 0000 0000" required />
        <BBButton full size="lg" type="submit">Send code</BBButton>
        <p className="text-xs text-muted-foreground text-center">We'll text you a 6-digit code. Standard rates apply.</p>
      </FormWrapper>
    );
  }
  return (
    <FormWrapper
      form={otpForm}
      onSubmit={() => { loginWithPhone(phone); nav("/dashboard"); }}
      className="space-y-4"
    >
      <button type="button" onClick={() => setPhone(null)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Change number
      </button>
      <p className="text-sm">Code sent to <span className="font-medium">{phone}</span></p>
      <FormInput<OtpVerifyInput> name="code" label="6-digit verification code" placeholder="000000" required maxLength={6} />
      <BBButton full size="lg" type="submit">Verify & sign in</BBButton>
      <button type="button" className="w-full text-xs text-primary hover:underline">Resend code in 30s</button>
    </FormWrapper>
  );
}

function WeChatPanel() {
  const loginWithWeChat = useAuth((s) => s.loginWithWeChat);
  const nav = useNavigate();
  return (
    <div className="text-center space-y-4 py-2">
      <div className="mx-auto h-44 w-44 rounded-md border border-border bg-surface grid place-items-center">
        <div className="grid grid-cols-8 gap-0.5 p-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className={`h-3 w-3 ${Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"}`} />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Scan with WeChat to sign in instantly.</p>
      <BBButton full variant="secondary" onClick={() => { loginWithWeChat(); nav("/dashboard"); }}>
        I've scanned — continue
      </BBButton>
    </div>
  );
}

export function Login() {
  const [method, setMethod] = useState<Method>("email");
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your Tradela buyer account.">
      <MethodTabs value={method} onChange={setMethod} />
      <AnimatePresence mode="wait">
        <motion.div key={method} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
          {method === "email" && <EmailLoginForm />}
          {method === "otp" && <OtpFlow />}
          {method === "wechat" && <WeChatPanel />}
        </motion.div>
      </AnimatePresence>
      <p className="text-xs text-center text-muted-foreground mt-6">
        No account? <Link to="/register" className="text-primary hover:underline font-medium">Create one free</Link>
      </p>
    </AuthShell>
  );
}

export function Register() {
  const loginWithEmail = useAuth((s) => s.loginWithEmail);
  const nav = useNavigate();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirm: "" },
  });
  return (
    <AuthShell title="Create your account" subtitle="Join 200,000+ verified B2B buyers.">
      <FormWrapper
        form={form}
        onSubmit={(v) => { loginWithEmail(v.email); nav("/dashboard"); }}
        className="space-y-4"
      >
        <FormInput<RegisterInput> name="name" label="Full name" required />
        <FormInput<RegisterInput> name="phone" label="Phone number" required />
        <FormInput<RegisterInput> name="email" label="Business email" type="email" required />
        <div className="grid grid-cols-2 gap-3">
          <FormInput<RegisterInput> name="password" label="Password" type="password" required />
          <FormInput<RegisterInput> name="confirm" label="Confirm" type="password" required />
        </div>
        <p className="text-xs text-muted-foreground">By registering you agree to the Tradela Terms of Service.</p>
        <BBButton full size="lg" type="submit" loading={form.formState.isSubmitting}>Create account</BBButton>
      </FormWrapper>
      <p className="text-xs text-center text-muted-foreground mt-6">
        Already a member? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
      </p>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center"><Package2 className="h-5 w-5" /></div>
            <span className="font-semibold">Tradela</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1.5 mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
      <div className="hidden lg:flex relative bg-primary text-primary-foreground p-12 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary-foreground)/0.12),transparent_60%)]" />
        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold leading-tight">The modern way to source wholesale.</h2>
          <p className="mt-3 text-primary-foreground/80">Connect with verified suppliers, request quotes, and negotiate directly inside Tradela.</p>
          <div className="mt-8 space-y-3">
            {[
              { i: BadgeCheck, t: "200,000+ verified suppliers" },
              { i: MessageSquare, t: "Built-in negotiation chat" },
              { i: ShieldCheck, t: "Trade Assurance on every order" },
            ].map((b) => (
              <div key={b.t} className="flex items-center gap-3 text-sm">
                <div className="h-9 w-9 rounded-md bg-primary-foreground/10 grid place-items-center"><b.i className="h-4 w-4" /></div>
                {b.t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
