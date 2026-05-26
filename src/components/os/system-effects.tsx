"use client";

import { useEffect } from "react";
import type { SystemTheme } from "@/store/system-store";
import { useSystemStore } from "@/store/system-store";

const isSystemTheme = (theme: string | null): theme is SystemTheme =>
  theme === "light" || theme === "dark" || theme === "auto";

export function SystemEffects() {
  const accentColor = useSystemStore((state) => state.accentColor);
  const setTheme = useSystemStore((state) => state.setTheme);
  const theme = useSystemStore((state) => state.theme);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-os-theme");
    if (isSystemTheme(storedTheme)) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    const applyTheme = () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const useDark = theme === "dark" || (theme === "auto" && prefersDark);

      document.documentElement.dataset.theme = useDark ? "dark" : "light";
      document.documentElement.classList.toggle("dark", useDark);
      document.documentElement.style.setProperty("--macos-accent", accentColor);
      window.localStorage.setItem("portfolio-os-theme", theme);
    };

    applyTheme();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyTheme);

    return () => media.removeEventListener("change", applyTheme);
  }, [accentColor, theme]);

  return null;
}
