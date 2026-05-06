import { create } from "zustand";

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
