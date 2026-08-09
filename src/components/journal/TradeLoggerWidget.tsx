"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FileText, Plus, CheckCircle2 } from "lucide-react";

export default function TradeLoggerWidget() {
  const [trades, setTrades] = useState([
    { pair: "EUR/USD", type: "BUY", lotSize: 1.5, riskReward: "1:2.4", outcome: "WIN (+2.4 R)", date: "2026-08-08" },
    { pair: "GBP/USD", type: "SELL", lotSize: 1.0, riskReward: "1:1.8", outcome: "WIN (+1.8 R)", date: "2026-08-07" },
    { pair: "Gold (XAU)", type: "BUY", lotSize: 0.5, riskReward: "1:2.0", outcome: "LOSS (-1.0 R)", date: "2026-08-06" }
  ]);

  return (
    <GlassCard className="p-6 border-border font-sora">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#22e600]" />
          <h3 className="text-lg font-bold text-white">Institutional Trade Journal & Performance Audit</h3>
        </div>

        <Button variant="primary" size="sm" className="font-bold text-xs uppercase tracking-wider bg-[#22e600] text-black">
          <Plus className="w-3.5 h-3.5" /> Log New Trade Entry
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse font-mono">
          <thead>
            <tr className="border-b border-border text-muted-foreground font-bold">
              <th className="p-3">Asset Pair</th>
              <th className="p-3">Type</th>
              <th className="p-3">Position Size</th>
              <th className="p-3">Risk : Reward</th>
              <th className="p-3">Trade Outcome</th>
              <th className="p-3 text-right">Execution Log Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {trades.map((t, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors">
                <td className="p-3 font-bold text-white">{t.pair}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${t.type === "BUY" ? "bg-[#22e600]/20 text-[#22e600]" : "bg-destructive/20 text-destructive"}`}>
                    {t.type}
                  </span>
                </td>
                <td className="p-3 text-white">{t.lotSize} Lots</td>
                <td className="p-3 text-muted-foreground">{t.riskReward}</td>
                <td className={`p-3 font-bold ${t.outcome.includes("WIN") ? "text-[#22e600]" : "text-destructive"}`}>
                  {t.outcome}
                </td>
                <td className="p-3 text-right text-muted-foreground text-[11px]">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
