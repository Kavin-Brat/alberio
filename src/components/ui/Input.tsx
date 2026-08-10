"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Error message; also applies red border */
  error?: string;
  /** Icon rendered on the left inside the input */
  leftIcon?: React.ReactNode;
  /** Icon rendered on the right inside the input */
  rightIcon?: React.ReactNode;
  /** Wrapping div className */
  wrapperClassName?: string;
}

// ─── Input Component ──────────────────────────────────────────────────────────

/**
 * Shared Text Input Component
 * Styled text field with optional label, hint, error, and left/right icons.
 *
 * Usage:
 *   <Input label="Email" type="email" placeholder="you@example.com"
 *          leftIcon={<Mail className="w-4 h-4" />} error={errors.email} />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, hint, error, leftIcon, rightIcon, wrapperClassName, className, ...props },
    ref
  ) => {
    return (
      <div className={cn("w-full space-y-1 font-sora", wrapperClassName)}>
        {/* Label */}
        {label && (
          <label className="block text-xs font-semibold text-slate-400">{label}</label>
        )}

        {/* Field */}
        <div className="relative w-full">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-slate-950 border rounded text-white text-xs font-mono placeholder:text-slate-600 transition-colors",
              "focus:outline-hidden focus:border-[#00FF00]",
              leftIcon ? "pl-9" : "pl-3",
              rightIcon ? "pr-9" : "pr-3",
              "py-2.5",
              error ? "border-red-500/70" : "border-slate-800 hover:border-slate-700",
              props.disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-[10px] font-mono text-red-400">{error}</p>
        )}

        {/* Hint */}
        {hint && !error && (
          <p className="text-[10px] font-mono text-slate-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

// ─── Textarea ─────────────────────────────────────────────────────────────────

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

/**
 * Shared Textarea Component
 * Multi-line text field styled to match the Input component.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, wrapperClassName, className, ...props }, ref) => {
    return (
      <div className={cn("w-full space-y-1 font-sora", wrapperClassName)}>
        {label && (
          <label className="block text-xs font-semibold text-slate-400">{label}</label>
        )}
        <textarea
          ref={ref}
          rows={4}
          className={cn(
            "w-full bg-slate-950 border rounded px-3 py-2.5 text-white text-xs font-mono placeholder:text-slate-600 resize-none transition-colors",
            "focus:outline-hidden focus:border-[#00FF00]",
            error ? "border-red-500/70" : "border-slate-800 hover:border-slate-700",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error && <p className="text-[10px] font-mono text-red-400">{error}</p>}
        {hint && !error && <p className="text-[10px] font-mono text-slate-500">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
