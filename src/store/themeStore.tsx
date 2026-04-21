import { create } from "zustand";
import { persist } from "zustand/middleware";

// theme type
type ThemeState = {
  dark: boolean;
  toggleDark: () => void;
  initTheme: () => void;
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // initial state
      dark: false,

      // toggle state
      toggleDark: () =>
        set((state) => {
          const newDark = !state.dark;
          document.documentElement.classList.toggle("dark", newDark);
          return { dark: newDark };
        }),

      initTheme: () =>
        set((state) => {
          document.documentElement.classList.toggle("dark", state.dark);
          return {};
        }),
    }),
    { name: "theme" },
  ),
);

export default useThemeStore;
