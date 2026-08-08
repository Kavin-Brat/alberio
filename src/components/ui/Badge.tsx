"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "cyan" | "violet";
}

export default function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] font-heading font-bold uppercase tracking-wider transition-colors",
        {
          "bg-secondary-dark text-light-purple border border-cyber-cyan/15": variant === "default",
          "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 text-glow-cyan": variant === "gold" || variant === "cyan",
          "bg-neon-violet/15 text-neon-violet border border-neon-violet/30": variant === "violet",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
