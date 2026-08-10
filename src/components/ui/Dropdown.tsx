"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DropdownOption {
  label: string;
  value: string;
  /** Optional icon element shown beside the label */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  /** Helper text shown below the field */
  hint?: string;
  disabled?: boolean;
  className?: string;
}

// ─── Dropdown Component ───────────────────────────────────────────────────────

/**
 * Shared Dropdown Select Component
 * Fully keyboard-accessible, styled to Albireo's dark design.
 * - Supports optional label and hint text
 * - Shows a checkmark on the currently selected option
 * - Closes on outside click or Escape key
 *
 * Usage:
 *   <Dropdown
 *     label="Select Role"
 *     options={[{ label: "Admin", value: "SUPER_ADMIN" }]}
 *     value={role}
 *     onChange={setRole}
 *   />
 */
export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  label,
  hint,
  disabled = false,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className={cn("relative w-full font-sora", className)} ref={ref}>
      {/* Label */}
      {label && (
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-white transition-colors cursor-pointer",
          "hover:border-slate-700 focus:outline-hidden focus:border-[#00FF00]",
          open && "border-[#00FF00]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={cn("flex items-center gap-2", !selected && "text-slate-500")}>
          {selected?.icon}
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Options List */}
      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded bg-[#0b0b0b] border border-slate-800 shadow-2xl overflow-hidden"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              disabled={opt.disabled}
              onClick={() => {
                if (!opt.disabled) {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-3 py-2.5 text-xs font-mono text-left transition-colors cursor-pointer",
                "hover:bg-slate-900 hover:text-white",
                opt.value === value
                  ? "text-[#00FF00] bg-[#00FF00]/5"
                  : "text-slate-300",
                opt.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <span className="flex items-center gap-2">
                {opt.icon}
                {opt.label}
              </span>
              {opt.value === value && <Check className="w-3.5 h-3.5 text-[#00FF00] shrink-0" />}
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      {hint && (
        <p className="mt-1 text-[10px] text-slate-500 font-mono">{hint}</p>
      )}
    </div>
  );
}
