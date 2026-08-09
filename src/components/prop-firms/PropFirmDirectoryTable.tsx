"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ShieldCheck, Search, Filter, ExternalLink } from "lucide-react";

interface PropFirmRecord {
  name: string;
  maxDrawdownType: "Static" | "Trailing" | "Relative" | "Balance-based";
  maxDrawdownPct: number;
  dailyDrawdownPct: number;
  profitTargetPct: number;
  trustScore: number;
  minTradingDays: number;
  leverage: string;
}

export default function PropFirmDirectoryTable() {
  const [firms] = useState<PropFirmRecord[]>([
    { name: "FTMO", maxDrawdownType: "Static", maxDrawdownPct: 10, dailyDrawdownPct: 5, profitTargetPct: 10, trustScore: 9.8, minTradingDays: 4, leverage: "1:100" },
    { name: "FundedNext", maxDrawdownType: "Balance-based", maxDrawdownPct: 10, dailyDrawdownPct: 5, profitTargetPct: 10, trustScore: 9.5, minTradingDays: 0, leverage: "1:100" },
    { name: "The Funded Trader", maxDrawdownType: "Trailing", maxDrawdownPct: 6, dailyDrawdownPct: 3, profitTargetPct: 8, trustScore: 8.9, minTradingDays: 5, leverage: "1:200" },
    { name: "5%ers", maxDrawdownType: "Static", maxDrawdownPct: 6, dailyDrawdownPct: 4, profitTargetPct: 8, trustScore: 9.6, minTradingDays: 0, leverage: "1:30" }
  ]);

  return (
    <GlassCard className="p-6 border-border font-sora">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#22e600]" />
          <h3 className="text-lg font-bold text-white">Prop Firm Evaluation Directory & Compliance Rules</h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground font-bold font-mono">
              <th className="p-3">Prop Firm</th>
              <th className="p-3">Drawdown Type</th>
              <th className="p-3">Max DD %</th>
              <th className="p-3">Daily DD %</th>
              <th className="p-3">Target %</th>
              <th className="p-3">Trust Score</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border font-mono">
            {firms.map((f, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors">
                <td className="p-3 font-bold text-white">{f.name}</td>
                <td className="p-3 text-muted-foreground">{f.maxDrawdownType}</td>
                <td className="p-3 text-[#22e600] font-bold">-{f.maxDrawdownPct}%</td>
                <td className="p-3 text-white">-{f.dailyDrawdownPct}%</td>
                <td className="p-3 text-white">+{f.profitTargetPct}%</td>
                <td className="p-3 text-[#22e600] font-bold">{f.trustScore} / 10</td>
                <td className="p-3 text-right">
                  <Button variant="secondary" size="sm" className="font-bold text-[10px]">
                    Compare Math
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
