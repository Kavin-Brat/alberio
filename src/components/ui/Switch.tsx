"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  /** Colour when ON. Defaults to Albireo green */
  activeColor?: "green" | "emerald" | "blue" | "red";
  className?: string;
  id?: string;
}

const TRACK_ACTIVE: Record<NonNullable<SwitchProps["activeColor"]>, string> = {
  green:   "bg-[#00FF00]",
  emerald: "bg-emerald-500",
  blue:    "bg-blue-500",
  red:     "bg-red-500",
};

// ─── Switch Component ─────────────────────────────────────────────────────────

/**
 * Shared Toggle Switch Component
 * Accessible ON/OFF toggle styled to Albireo's dark aesthetic.
 * - Supports sm / md / lg sizes
 * - Configurable active colour
 * - Shows optional label + description beside the toggle
 *
 * Usage:
 *   <Switch checked={enabled} onChange={setEnabled} label="Enable Notifications" />
 */
export default function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  activeColor = "green",
  className,
  id,
}: SwitchProps) {
  const switchId = id ?? `switch-${Math.random().toString(36).slice(2, 8)}`;

  const trackSize =
    size === "sm" ? "w-8 h-4" : size === "lg" ? "w-14 h-7" : "w-11 h-6";
  const thumbSize =
    size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5.5 h-5.5" : "w-4 h-4";
  const thumbTranslate =
    size === "sm" ? "translate-x-4" : size === "lg" ? "translate-x-7" : "translate-x-5";

  return (
    <label
      htmlFor={switchId}
      className={cn(
        "flex items-center gap-3 cursor-pointer select-none font-sora",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Track */}
      <div className="relative shrink-0">
        <input
          id={switchId}
          type="checkbox"
          role="switch"
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "rounded-full transition-colors duration-200",
            trackSize,
            checked ? TRACK_ACTIVE[activeColor] : "bg-slate-700"
          )}
        />
        {/* Thumb */}
        <div
          className={cn(
            "absolute top-0.5 left-0.5 rounded-full bg-white shadow-md transition-transform duration-200",
            thumbSize,
            checked ? thumbTranslate : "translate-x-0"
          )}
        />
      </div>

      {/* Text */}
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-xs font-semibold text-white leading-tight">{label}</span>
          )}
          {description && (
            <span className="text-[10px] text-slate-400 font-light leading-tight">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
