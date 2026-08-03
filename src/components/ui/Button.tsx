"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

/**
 * Reusable Atomic Button Component
 * Supporting dark/light styling, loading states, and accessibilities.
 */
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none rounded-lg";

  const variants = {
    primary: "bg-cygnus-gold text-albireo-blue hover:bg-cygnus-gold/90 active:scale-95 shadow-md shadow-cygnus-gold/10 hover:shadow-cygnus-gold/25",
    secondary: "bg-surface-card border border-border-custom hover:border-text-secondary/40 text-text-primary hover:bg-albireo-blue",
    accent: "bg-transparent border border-transparent hover:border-border-custom hover:bg-surface-card/60 text-text-primary hover:text-accent-gold",
    danger: "bg-loss/10 border border-loss/25 text-loss hover:bg-loss/20 hover:text-white"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base"
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
