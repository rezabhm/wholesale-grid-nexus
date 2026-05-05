import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store";
import { BBButton } from "@/components/BBButton";
import { Package2, ShieldCheck, MessageSquare, BadgeCheck } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const login = useAuth((s) => s.login);
  const nav = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    nav("/dashboard");
  };
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your Tradela buyer account.">
      <form className="space-y-4" onSubmit={submit}>
        <Field label="Business email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value={pw} onChange={setPw} required />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-1.5"><input type="checkbox" className="accent-primary" /> Remember me</label>
          <a className="text-primary hover:underline" href="#">Forgot password?</a>
        </div>
        <BBButton full size="lg" type="submit">Sign in</BBButton>
        <p className="text-xs text-center text-muted-foreground">No account? <Link to="/register" className="text-primary hover:underline font-medium">Create one free</Link></p>
      </form>
    </AuthShell>
  );
}

export function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const login = useAuth((s) => s.login);
  const nav = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    nav("/dashboard");
  };
  return (
    <AuthShell title="Create your account" subtitle="Join 200,000+ verified B2B buyers.">
      <form className="space-y-4" onSubmit={submit}>
        <Field label="Full name" value={name} onChange={setName} required />
        <Field label="Phone number" value={phone} onChange={setPhone} required />
        <Field label="Business email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value="" onChange={() => {}} required />
        <p className="text-xs text-muted-foreground">By registering you agree to the Tradela Terms of Service.</p>
        <BBButton full size="lg" type="submit">Create account</BBButton>
        <p className="text-xs text-center text-muted-foreground">Already a member? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link></p>
      </form>
    </AuthShell>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="input-bb mt-1.5" />
    </label>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      {/* Left form */}
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
      {/* Right brand panel */}
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
