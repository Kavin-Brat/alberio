"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "gold"
    | "cyan"
    | "violet"
    | "outline";
  size?: "sm" | "md" | "lg";
}

/**
 * Enterprise Reusable UI Badge Component
 * Follows Open/Closed Principle with extensible variants and sizes.
 */
export default function Badge({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-secondary text-muted-foreground border border-border",
    primary: "bg-[#22e600]/10 text-[#22e600] border border-[#22e600]/30 shadow-[0_0_10px_rgba(34,230,0,0.15)]",
    secondary: "bg-slate-800 text-slate-200 border border-slate-700",
    success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    danger: "bg-red-500/20 text-red-400 border border-red-500/30",
    warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    info: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
    gold: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
    cyan: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]",
    violet: "bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    outline: "bg-transparent text-slate-300 border border-slate-700",
  };

  const sizeStyles = {
    sm: "px-2 py-0.25 text-[9px]",
    md: "px-2.5 py-0.5 text-[10px]",
    lg: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-mono font-bold uppercase tracking-wider transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
