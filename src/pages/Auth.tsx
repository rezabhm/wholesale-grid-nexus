import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store";
import { BBButton } from "@/components/BBButton";

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
    <AuthShell title="Sign in" subtitle="Welcome back to Tradela">
      <form className="space-y-3" onSubmit={submit}>
        <Field label="Business email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value={pw} onChange={setPw} required />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-1"><input type="checkbox" className="accent-primary" /> Remember me</label>
          <a className="text-primary hover:underline" href="#">Forgot password?</a>
        </div>
        <BBButton full type="submit">Sign in</BBButton>
        <p className="text-xs text-center text-muted-foreground">No account? <Link to="/register" className="text-primary hover:underline">Register free</Link></p>
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
    <AuthShell title="Create your account" subtitle="Join 200,000+ verified buyers">
      <form className="space-y-3" onSubmit={submit}>
        <Field label="Full name" value={name} onChange={setName} required />
        <Field label="Phone number" value={phone} onChange={setPhone} required />
        <Field label="Business email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value="" onChange={() => {}} required />
        <p className="text-xs text-muted-foreground">By registering you agree to the Tradela Terms of Service.</p>
        <BBButton full type="submit">Create account</BBButton>
        <p className="text-xs text-center text-muted-foreground">Already a member? <Link to="/login" className="text-primary hover:underline">Sign in</Link></p>
      </form>
    </AuthShell>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="mt-1 w-full border border-border h-10 px-3 text-sm outline-none focus:border-primary" />
    </label>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-surface-alt flex items-center justify-center px-4 py-10">
      <div className="bg-card border border-border w-full max-w-md p-6">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-5">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
