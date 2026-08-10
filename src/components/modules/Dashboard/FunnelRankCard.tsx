"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";

export interface FunnelRankCardProps {
  currentLevel: number;
}

/**
 * Funnel Rank Card Child Component
 * Displays the 6-level trader progression funnel rank status.
 */
export default function FunnelRankCard({ currentLevel }: FunnelRankCardProps) {
  const FUNNEL_LEVELS = [
    { level: 1, title: "Level 1: Free Visitor", desc: "Access free articles & basic tools" },
    { level: 2, title: "Level 2: Registered Account", desc: "Saved journal & course progress" },
    { level: 3, title: "Level 3: Engaged Trader", desc: "Active drills & simulations" },
    { level: 4, title: "Level 4: Albireo Pro", desc: "Unlimited Monte Carlo & analytics" },
    { level: 5, title: "Level 5: Prop Firm Account", desc: "Evaluation candidate / funded account" },
    { level: 6, title: "Level 6: Capital / Wealth", desc: "Fund manager / institutional pool" },
  ];

  return (
    <GlassCard className="p-6 border-slate-800 bg-[#0b0b0b] font-sora flex flex-col justify-between">
      <div>
        <span className="text-xs font-mono font-bold text-[#00FF00] uppercase tracking-wider block mb-2">
          Traders Funnel Evolution
        </span>
        <h3 className="text-lg font-bold text-white mb-4">Current Rank: Level {currentLevel}</h3>

        <div className="space-y-3">
          {FUNNEL_LEVELS.map((f) => (
            <div
              key={f.level}
              className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-colors ${
                currentLevel === f.level
                  ? "bg-[#00FF00]/10 border-[#00FF00] text-white"
                  : currentLevel > f.level
                  ? "bg-slate-900 border-slate-800 text-slate-400"
                  : "bg-slate-950 border-transparent text-slate-600"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                  currentLevel === f.level
                    ? "bg-[#00FF00] text-black font-bold"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {f.level}
              </div>
              <div>
                <span className="font-semibold block text-white">{f.title}</span>
                <span className="text-[10px] block opacity-80">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
