import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { productId: string; qty: number };

type CartState = {
  items: CartItem[];
  add: (i: CartItem) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (i) => set((s) => ({ items: [...s.items.filter((x) => x.productId !== i.productId), i] })),
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
    }),
    { name: "tradela-cart" },
  ),
);
