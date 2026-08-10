"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  /** Shows a close button; caller must hide the toast in onClose */
  onClose?: () => void;
  className?: string;
}

const VARIANT_STYLES: Record<ToastVariant, { wrapper: string; icon: React.ReactNode }> = {
  success: {
    wrapper: "bg-emerald-500/10 border-emerald-500/40 text-emerald-400",
    icon: <CheckCircle2 className="w-4 h-4 shrink-0" />,
  },
  error: {
    wrapper: "bg-red-500/10 border-red-500/40 text-red-400",
    icon: <XCircle className="w-4 h-4 shrink-0" />,
  },
  warning: {
    wrapper: "bg-amber-500/10 border-amber-500/40 text-amber-400",
    icon: <AlertTriangle className="w-4 h-4 shrink-0" />,
  },
  info: {
    wrapper: "bg-blue-500/10 border-blue-500/40 text-blue-400",
    icon: <Info className="w-4 h-4 shrink-0" />,
  },
};

// ─── Toast (Inline Alert) Component ──────────────────────────────────────────

/**
 * Shared Toast / Inline Alert Component
 * Shows a coloured status message bar with an icon.
 * - success / error / warning / info variants
 * - Optional close button (caller controls visibility via state)
 *
 * Usage:
 *   {message && (
 *     <Toast message={message} variant="success" onClose={() => setMessage(null)} />
 *   )}
 */
export default function Toast({
  message,
  variant = "info",
  onClose,
  className,
}: ToastProps) {
  const style = VARIANT_STYLES[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2.5 px-4 py-2.5 rounded border text-xs font-mono font-bold",
        style.wrapper,
        className
      )}
    >
      {style.icon}
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// ─── useToast hook ───────────────────────────────────────────────────────────

/**
 * Lightweight hook for managing a single toast message.
 *
 * Usage:
 *   const { toast, showToast, clearToast } = useToast();
 *   showToast("Saved!", "success");
 *   // ...
 *   {toast && <Toast {...toast} onClose={clearToast} />}
 */
export interface ToastState {
  message: string;
  variant: ToastVariant;
}

export function useToast() {
  const [toast, setToast] = React.useState<ToastState | null>(null);

  const showToast = React.useCallback(
    (message: string, variant: ToastVariant = "info", durationMs = 3500) => {
      setToast({ message, variant });
      setTimeout(() => setToast(null), durationMs);
    },
    []
  );

  const clearToast = React.useCallback(() => setToast(null), []);

  return { toast, showToast, clearToast };
}
