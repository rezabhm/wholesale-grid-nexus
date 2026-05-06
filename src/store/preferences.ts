import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferencesState = {
  theme: "light" | "dark";
  dir: "ltr" | "rtl";
  locale: "en" | "fa" | "zh";
  setTheme: (t: "light" | "dark") => void;
  setDir: (d: "ltr" | "rtl") => void;
  setLocale: (l: "en" | "fa" | "zh") => void;
};

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "light",
      dir: "ltr",
      locale: "en",
      setTheme: (theme) => set({ theme }),
      setDir: (dir) => set({ dir }),
      setLocale: (locale) => set({ locale }),
    }),
    { name: "tradela-preferences" },
  ),
);
