"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyber" | "danger" | "navCta" | "hero" | "heroOutline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-sora font-medium tracking-wide uppercase transition-all duration-300 rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          // Variants
          {
            "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.97] hover:shadow-[0_0_20px_rgba(34,230,0,0.4)]":
              variant === "primary" || variant === "hero",
            "text-foreground bg-nav-button hover:bg-nav-button/80 active:scale-[0.97] border border-border":
              variant === "navCta",
            "bg-foreground text-background hover:brightness-90 active:scale-[0.97]":
              variant === "heroOutline" || variant === "secondary",
            "border border-primary text-primary bg-transparent hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(34,230,0,0.2)]":
              variant === "outline",
            "text-muted-foreground hover:text-foreground bg-transparent":
              variant === "ghost",
            "relative overflow-hidden bg-hero-bg border border-primary text-primary before:absolute before:inset-0 before:-translate-x-full before:bg-primary before:transition-transform before:duration-300 hover:before:translate-x-0 hover:text-primary-foreground z-0 before:-z-10":
              variant === "cyber",
            "bg-destructive/15 border border-destructive/30 text-destructive hover:bg-destructive/25":
              variant === "danger",
          },
          // Sizes
          {
            "px-4 py-2 text-xs": size === "sm",
            "px-6 py-3 text-sm": size === "md",
            "px-8 py-4 text-base": size === "lg",
          },
          className
        )}
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
);

Button.displayName = "Button";
export default Button;
