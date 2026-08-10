"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  /** Show current value beside the label */
  showValue?: boolean;
  /** Format the displayed value (e.g. add $ or %) */
  formatValue?: (v: number) => string;
  hint?: string;
  disabled?: boolean;
  /** Track fill colour */
  color?: "green" | "blue" | "emerald" | "red" | "amber";
  className?: string;
}

const TRACK_COLOR: Record<NonNullable<SliderProps["color"]>, string> = {
  green:   "#00FF00",
  emerald: "#10b981",
  blue:    "#3b82f6",
  red:     "#ef4444",
  amber:   "#f59e0b",
};

// ─── Slider Component ─────────────────────────────────────────────────────────

/**
 * Shared Range Slider Component
 * Styled thumb-track slider using Albireo's green accent by default.
 * - Shows optional label + current value
 * - Custom value formatter (e.g. `$100,000` or `2.5%`)
 * - Configurable min / max / step
 *
 * Usage:
 *   <Slider label="Initial Balance" min={10000} max={500000} step={5000}
 *           value={balance} onChange={setBalance}
 *           formatValue={(v) => `$${v.toLocaleString()}`} />
 */
export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  formatValue = (v) => String(v),
  hint,
  disabled = false,
  color = "green",
  className,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const accent = TRACK_COLOR[color];

  return (
    <div className={cn("w-full font-sora space-y-1.5", className)}>
      {/* Label row */}
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-xs font-semibold text-slate-400">{label}</label>
          )}
          {showValue && (
            <span className="text-xs font-mono font-bold" style={{ color: accent }}>
              {formatValue(value)}
            </span>
          )}
        </div>
      )}

      {/* Range track */}
      <div className="relative w-full h-1.5 rounded-full bg-slate-800">
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
          style={{ width: `${pct}%`, background: accent }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        {/* Thumb indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-100 pointer-events-none"
          style={{ left: `${pct}%`, background: accent }}
        />
      </div>

      {/* Min / Max labels */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>

      {/* Hint */}
      {hint && <p className="text-[10px] text-slate-500 font-mono">{hint}</p>}
    </div>
  );
}
