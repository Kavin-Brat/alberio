"use client";

import React from "react";
import { Crown, Sparkles } from "lucide-react";

export interface DemoPersonaSwitcherProps {
  onSelectUser: (userId: string) => void;
}

/**
 * 1-Click Instant Demo Persona Switcher Component
 * Provides instant login buttons for CEO Admin and Pro Trader demo personas.
 */
export default function DemoPersonaSwitcher({ onSelectUser }: DemoPersonaSwitcherProps) {
  return (
    <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center block font-mono">
        1-Click Instant Demo Login As:
      </span>

      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => onSelectUser("usr-kavin-ceo")}
          className="p-2 bg-slate-950 hover:bg-slate-900 border border-[#00FF00]/40 text-[#00FF00] rounded text-left transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Crown className="w-3.5 h-3.5 shrink-0 text-[#00FF00]" />
          <span className="truncate">Kavin (CEO Admin)</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectUser("usr-alex-pro")}
          className="p-2 bg-slate-950 hover:bg-slate-900 border border-emerald-500/40 text-emerald-400 rounded text-left transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span className="truncate">Alex (Pro Trader)</span>
        </button>
      </div>
    </div>
  );
}
