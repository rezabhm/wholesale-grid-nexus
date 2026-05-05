import { create } from "zustand";

type User = { id: string; name: string; email: string };

type AuthState = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: (email) => set({ user: { id: "u1", name: email.split("@")[0], email } }),
  logout: () => set({ user: null }),
}));

type UIState = {
  rfqOpen: boolean;
  rfqProductId: string | null;
  openRfq: (productId: string) => void;
  closeRfq: () => void;
  mobileMenuOpen: boolean;
  setMobileMenu: (v: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  rfqOpen: false,
  rfqProductId: null,
  openRfq: (productId) => set({ rfqOpen: true, rfqProductId: productId }),
  closeRfq: () => set({ rfqOpen: false, rfqProductId: null }),
  mobileMenuOpen: false,
  setMobileMenu: (v) => set({ mobileMenuOpen: v }),
}));

type CartItem = { productId: string; qty: number };
type CartState = {
  items: CartItem[];
  add: (i: CartItem) => void;
  clear: () => void;
};
export const useCart = create<CartState>((set) => ({
  items: [],
  add: (i) => set((s) => ({ items: [...s.items, i] })),
  clear: () => set({ items: [] }),
}));
