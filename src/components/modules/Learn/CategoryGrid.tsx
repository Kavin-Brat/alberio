"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock } from "lucide-react";
import { Category } from "@/data/learnData";

export interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

const COLOR_MAP: Record<string, { border: string; badge: string; accent: string; btn: string }> = {
  forex:   { border: "border-[#00FF00]/40 hover:shadow-[0_0_30px_rgba(0,255,0,0.12)]", badge: "bg-[#00FF00]/10 text-[#00FF00]",  accent: "text-[#00FF00]",  btn: "bg-[#00FF00] text-black hover:bg-[#00FF00]/90" },
  crypto:  { border: "border-slate-700/50", badge: "bg-slate-800 text-slate-400",        accent: "text-slate-400",  btn: "bg-slate-800 text-slate-500 cursor-not-allowed" },
  futures: { border: "border-slate-700/50", badge: "bg-slate-800 text-slate-400",        accent: "text-slate-400",  btn: "bg-slate-800 text-slate-500 cursor-not-allowed" },
  stocks:  { border: "border-slate-700/50", badge: "bg-slate-800 text-slate-400",        accent: "text-slate-400",  btn: "bg-slate-800 text-slate-500 cursor-not-allowed" },
};

/**
 * CategoryGrid Component
 * Renders the 4 learning category cards — Learn Forex (active), others (coming soon).
 * Disabled cards show a "Coming Soon" badge and are non-interactive.
 */
export default function CategoryGrid({ categories, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((cat) => {
        const c = COLOR_MAP[cat.id] ?? COLOR_MAP.crypto;
        const isActive = cat.status === "active";

        return (
          <div
            key={cat.id}
            className={cn(
              "relative flex flex-col justify-between gap-5 p-6 rounded-xl bg-[#0b0b0b] border transition-all duration-300",
              c.border,
              !isActive && "opacity-60"
            )}
          >
            {/* Coming Soon overlay badge */}
            {!isActive && (
              <div className="absolute top-3 right-3">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700">
                  Coming Soon
                </span>
              </div>
            )}

            {/* Icon + Title */}
            <div className="space-y-2">
              <span className="text-4xl leading-none block">{cat.icon}</span>
              <h3 className={cn("text-lg font-black tracking-tight", isActive ? "text-white" : "text-slate-500")}>
                {cat.title}
              </h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">{cat.description}</p>
            </div>

            {/* CTA */}
            <button
              type="button"
              disabled={!isActive}
              onClick={() => isActive && onSelect(cat)}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors",
                c.btn,
                isActive && "cursor-pointer"
              )}
            >
              {isActive ? (
                <>Start Learning <ArrowRight className="w-3.5 h-3.5" /></>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5" /> Coming Soon
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
