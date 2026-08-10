"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconWrapperProps {
  /** The icon element (e.g. a Lucide icon JSX) */
  icon: React.ReactNode;
  /** Background/border colour theme */
  color?: "green" | "red" | "amber" | "blue" | "violet" | "slate" | "emerald";
  size?: IconSize;
  /** Add a CSS ring animation */
  pulse?: boolean;
  /** Add a bounce animation */
  bounce?: boolean;
  className?: string;
}

const SIZE_STYLES: Record<IconSize, string> = {
  xs: "w-6 h-6 rounded-lg",
  sm: "w-8 h-8 rounded-xl",
  md: "w-10 h-10 rounded-xl",
  lg: "w-12 h-12 rounded-2xl",
  xl: "w-16 h-16 rounded-2xl",
};

const COLOR_STYLES: Record<NonNullable<IconWrapperProps["color"]>, string> = {
  green:   "bg-[#00FF00]/10 border border-[#00FF00]/30 text-[#00FF00]",
  red:     "bg-red-500/10 border border-red-500/30 text-red-400",
  amber:   "bg-amber-500/10 border border-amber-500/30 text-amber-400",
  blue:    "bg-blue-500/10 border border-blue-500/30 text-blue-400",
  violet:  "bg-purple-500/10 border border-purple-500/30 text-purple-400",
  emerald: "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400",
  slate:   "bg-slate-800 border border-slate-700 text-slate-400",
};

// ─── IconWrapper Component ────────────────────────────────────────────────────

/**
 * Shared Icon Wrapper Component
 * Renders a padded, colour-coded container around any Lucide icon.
 * - Keeps icon sizes & colours consistent across all modules
 * - Supports pulse and bounce animations
 *
 * Usage:
 *   <IconWrapper icon={<ShieldCheck className="w-5 h-5" />} color="green" size="md" />
 *   <IconWrapper icon={<AlertTriangle className="w-5 h-5" />} color="amber" size="lg" pulse />
 */
export default function IconWrapper({
  icon,
  color = "green",
  size = "md",
  pulse = false,
  bounce = false,
  className,
}: IconWrapperProps) {
  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center",
        SIZE_STYLES[size],
        COLOR_STYLES[color],
        pulse && "[&>*]:animate-pulse",
        bounce && "[&>*]:animate-bounce",
        className
      )}
    >
      {icon}
    </div>
  );
}
