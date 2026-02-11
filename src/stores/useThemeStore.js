import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-app-theme") || "forest",
  setTheme: (newTheme) => {
    localStorage.setItem("chat-app-theme", newTheme);
    set({ theme: newTheme });
  },

  font: localStorage.getItem("chat-app-font") || "inter",
  setFont: (newFont) => {
    localStorage.setItem("chat-app-font", newFont);
    set({ font: newFont });
  },

  navBoutton: 1,
  setNavBoutton: (buttonId) => {
    set({ navBoutton: buttonId });
  },
}));
