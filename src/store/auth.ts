import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = { id: string; name: string; email?: string; phone?: string; provider: "email" | "otp" | "wechat" };

type AuthState = {
  user: AuthUser | null;
  loginWithEmail: (email: string) => void;
  loginWithPhone: (phone: string) => void;
  loginWithWeChat: () => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loginWithEmail: (email) => set({ user: { id: "u_" + Date.now(), name: email.split("@")[0], email, provider: "email" } }),
      loginWithPhone: (phone) => set({ user: { id: "u_" + Date.now(), name: "User " + phone.slice(-4), phone, provider: "otp" } }),
      loginWithWeChat: () => set({ user: { id: "wx_" + Date.now(), name: "WeChat User", provider: "wechat" } }),
      logout: () => set({ user: null }),
    }),
    { name: "tradela-auth" },
  ),
);
