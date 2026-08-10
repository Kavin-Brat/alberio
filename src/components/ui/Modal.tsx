"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ModalProps {
  /** Controls visibility */
  isOpen: boolean;
  /** Called when backdrop or close button is clicked */
  onClose: () => void;
  /** Modal card width class, defaults to max-w-lg */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Modal title shown in the header */
  title?: string;
  /** Optional subtitle / description below the title */
  description?: string;
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdrop?: boolean;
  children: React.ReactNode;
  className?: string;
}

const SIZE_MAP: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-full",
};

// ─── Modal Component ─────────────────────────────────────────────────────────

/**
 * Shared Modal Component
 * Renders a centered glassmorphism dialog with a translucent dark backdrop.
 * - Supports configurable sizes (sm → full)
 * - Shows optional title, description, and a close button
 * - Clicking the backdrop closes the modal by default
 *
 * Usage:
 *   <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm Action">
 *     <p>Are you sure?</p>
 *   </Modal>
 */
export default function Modal({
  isOpen,
  onClose,
  size = "md",
  title,
  description,
  closeOnBackdrop = true,
  children,
  className,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={closeOnBackdrop ? onClose : undefined}
      aria-modal="true"
      role="dialog"
    >
      {/* Card – stop propagation so inner clicks don't close */}
      <div
        className={cn(
          "relative w-full rounded-2xl bg-[#0b0b0b] border border-slate-800 shadow-2xl overflow-hidden font-sora",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          SIZE_MAP[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-800">
            <div className="space-y-0.5">
              {title && (
                <h2 className="text-base font-bold text-white tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xs text-slate-400 font-light">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-1 rounded text-slate-500 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
