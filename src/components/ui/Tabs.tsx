"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (value: string) => void;
  variant?: "underline" | "pill";
  className?: string;
}

// ─── Tabs Component ───────────────────────────────────────────────────────────

/**
 * Shared Tab Navigation Component
 * Switches between two visual styles: "underline" (default) and "pill".
 * - Underline: subtle bottom border indicator
 * - Pill: solid green-tinted background on active tab
 *
 * Usage:
 *   <Tabs
 *     tabs={[
 *       { label: "Overview", value: "overview", icon: <BarChart3 className="w-3.5 h-3.5" /> },
 *       { label: "Details", value: "details", badge: 3 },
 *     ]}
 *     activeTab={tab}
 *     onChange={setTab}
 *   />
 */
export default function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "underline",
  className,
}: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex gap-1 font-sora",
        variant === "underline" && "border-b border-slate-800",
        variant === "pill" && "bg-slate-950 border border-slate-800 rounded-lg p-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;

        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer",
              // Underline variant
              variant === "underline" && [
                "px-3 py-2.5 border-b-2 -mb-px",
                isActive
                  ? "border-[#00FF00] text-[#00FF00]"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-600",
              ],
              // Pill variant
              variant === "pill" && [
                "px-3 py-2 rounded",
                isActive
                  ? "bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900",
              ]
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold",
                  isActive
                    ? "bg-[#00FF00]/20 text-[#00FF00]"
                    : "bg-slate-800 text-slate-400"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
