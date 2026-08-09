"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "outline";
  className?: string;
}

/**
 * Reusable Status Badge Component
 */
export default function Badge({
  children,
  variant = "primary",
  className = ""
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[#00FF00]/10 text-[#00FF00] border-[#00FF00]/30",
    secondary: "bg-slate-800 text-slate-200 border-slate-700",
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    danger: "bg-red-500/20 text-red-400 border-red-500/30",
    outline: "bg-transparent text-slate-300 border-slate-700"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded border text-[10px] font-mono font-bold inline-flex items-center gap-1 ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
