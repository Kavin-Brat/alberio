"use client";

import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle Component
 * 
 * Interactive button to toggle application color settings (light / dark).
 * Conforms to WCAG AA accessibility, focus-visible states, and hover scales.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-border-custom bg-surface-card hover:bg-albireo-blue text-text-primary hover:text-cygnus-gold text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-3.5 h-3.5 text-cygnus-gold" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-cygnus-gold" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
