"use client";

import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle Component
 *
 * Icon-only pill button (40×40px, rounded-full).
 * Uses .theme-toggle CSS class from globals.css (glassmorphism recipe).
 * On md+ screens, floats fixed at bottom-right via .theme-toggle-fixed.
 * Icon color is driven by --toggle-foreground CSS variable.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle theme-toggle-fixed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cygnus-gold"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
