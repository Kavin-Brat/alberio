"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MenuItem {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** Renders a danger-red color */
  danger?: boolean;
  disabled?: boolean;
  /** Inserts a divider above this item */
  dividerAbove?: boolean;
}

export interface MenuProps {
  /** Menu trigger element */
  trigger: React.ReactNode;
  items: MenuItem[];
  /** Horizontal alignment of the dropdown */
  align?: "left" | "right";
  className?: string;
}

// ─── Menu Component ───────────────────────────────────────────────────────────

/**
 * Shared Context Menu / Dropdown Menu Component
 * Renders a floating menu list triggered by clicking a custom element.
 * - Closes on outside click or Escape
 * - Supports dividers, danger items, disabled items, icons, href links, and onClick actions
 *
 * Usage:
 *   <Menu
 *     trigger={<Button size="sm">Actions</Button>}
 *     items={[
 *       { label: "Edit", icon: <Edit2 className="w-3.5 h-3.5" />, onClick: handleEdit },
 *       { label: "Delete", icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, dividerAbove: true, onClick: handleDelete },
 *     ]}
 *   />
 */
export default function Menu({
  trigger,
  items,
  align = "right",
  className,
}: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  // Close on Escape
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={cn("relative inline-block", className)} ref={ref}>
      {/* Trigger */}
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown panel */}
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1 min-w-[180px] rounded bg-[#0b0b0b] border border-slate-800 shadow-2xl overflow-hidden",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {items.map((item, i) => {
            const content = (
              <span className="flex items-center gap-2">
                {item.icon && (
                  <span className="shrink-0 opacity-70">{item.icon}</span>
                )}
                {item.label}
              </span>
            );

            return (
              <React.Fragment key={i}>
                {item.dividerAbove && (
                  <div className="h-px bg-slate-800 mx-2 my-1" />
                )}
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 text-xs font-mono transition-colors",
                      item.danger
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white",
                      item.disabled && "opacity-40 pointer-events-none"
                    )}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onClick?.();
                        setOpen(false);
                      }
                    }}
                    className={cn(
                      "flex items-center w-full px-3 py-2 text-xs font-mono transition-colors cursor-pointer",
                      item.danger
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white",
                      item.disabled && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    {content}
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
