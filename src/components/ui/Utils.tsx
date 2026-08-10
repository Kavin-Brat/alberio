"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface EmptyStateProps {
  /** Any icon element (e.g. Lucide icon) */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

// ─── EmptyState Component ─────────────────────────────────────────────────────

/**
 * Shared Empty State Component
 * Renders a centered placeholder when a list, table, or section has no data.
 * - Accepts a custom icon, title, description, and CTA action button
 *
 * Usage:
 *   <EmptyState
 *     icon={<Users className="w-8 h-8" />}
 *     title="No users found"
 *     description="Try adjusting your search filters."
 *     action={<Button size="sm">Add User</Button>}
 *   />
 */
export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 px-6 text-center font-sora",
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-bold text-white">{title}</h3>
      {description && (
        <p className="text-xs text-slate-400 font-light max-w-xs">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// ─── Spinner Component ────────────────────────────────────────────────────────

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "green" | "white" | "slate";
  label?: string;
  className?: string;
}

const SPINNER_SIZE = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" };
const SPINNER_COLOR = {
  green: "border-[#00FF00]/30 border-t-[#00FF00]",
  white: "border-white/30 border-t-white",
  slate: "border-slate-700 border-t-slate-400",
};

/**
 * Shared Spinner / Loading Component
 *
 * Usage:
 *   <Spinner size="md" color="green" label="Loading users..." />
 */
export function Spinner({ size = "md", color = "green", label, className }: SpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 font-sora", className)}>
      <div
        className={cn(
          "rounded-full border-2 animate-spin",
          SPINNER_SIZE[size],
          SPINNER_COLOR[color]
        )}
      />
      {label && <p className="text-xs text-slate-400 font-mono">{label}</p>}
    </div>
  );
}

// ─── Divider Component ────────────────────────────────────────────────────────

export interface DividerProps {
  label?: string;
  className?: string;
}

/**
 * Shared Horizontal Divider with optional centered label.
 *
 * Usage:
 *   <Divider label="Or continue with" />
 */
export function Divider({ label, className }: DividerProps) {
  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <div className="flex-1 h-px bg-slate-800" />
      {label && (
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-slate-800" />
    </div>
  );
}
