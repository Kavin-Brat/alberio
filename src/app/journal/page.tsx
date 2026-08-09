"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Lock, Sparkles, BarChart3, Download, Layers } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from "recharts";
import KPICard from "@/components/dashboard/KPICard";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import ProUpgradeModal from "@/components/ui/ProUpgradeModal";

interface Trade {
  id: string;
  date: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  takeProfit: number;
  size: number;
  pnl: number;
  rr: number;
  strategy: string;
  psychology: string;
  session: "London" | "New York" | "Tokyo" | "Sydney";
  notes: string;
}

const DEFAULT_TRADES: Trade[] = [
  {
    id: "t1",
    date: "2026-07-28T09:15",
    symbol: "EUR/USD",
    direction: "LONG",
    entryPrice: 1.0850,
    exitPrice: 1.0910,
    stopLoss: 1.0820,
    takeProfit: 1.0910,
    size: 2.0,
    pnl: 1200,
    rr: 2.0,
    strategy: "Order Block",
    psychology: "Disciplined",
    session: "London",
    notes: "Clean mitigation of 15m order block. Exited at TP."
  },
  {
    id: "t2",
    date: "2026-07-29T14:30",
    symbol: "Gold (XAU)",
    direction: "SHORT",
    entryPrice: 2420,
    exitPrice: 2432,
    stopLoss: 2432,
    takeProfit: 2400,
    size: 1.5,
    pnl: -1800,
    rr: 1.6,
    strategy: "Breakout",
    psychology: "FOMO",
    session: "New York",
    notes: "Chased price after volatility index spiked. Stop loss hit."
  },
  {
    id: "t3",
    date: "2026-07-30T08:45",
    symbol: "GBP/USD",
    direction: "LONG",
    entryPrice: 1.2650,
    exitPrice: 1.2750,
    stopLoss: 1.2610,
    takeProfit: 1.2750,
    size: 2.5,
    pnl: 2500,
    rr: 2.5,
    strategy: "Fair Value Gap",
    psychology: "Disciplined",
    session: "London",
    notes: "Liquidity grab below Asian lows, entry at FVG fill."
  },
  {
    id: "t4",
    date: "2026-08-01T15:20",
    symbol: "EUR/USD",
    direction: "SHORT",
    entryPrice: 1.0920,
    exitPrice: 1.0880,
    stopLoss: 1.0940,
    takeProfit: 1.0860,
    size: 2.0,
    pnl: 800,
    rr: 2.0,
    strategy: "Trend",
    psychology: "Early Exit",
    session: "New York",
    notes: "Exited early ahead of economic release. Closed +40 pips."
  }
];

export default function TradeJournalPage() {
  const [trades, setTrades] = useState<Trade[]>(DEFAULT_TRADES);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  // Compute Metrics
  const totalTrades = trades.length;
  const winningTrades = trades.filter((t) => t.pnl > 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const netPnL = trades.reduce((acc, t) => acc + t.pnl, 0);

  return (
    <PageContainer>
      {/* HEADER HERO */}
      <div className="flex flex-col gap-4 font-sora">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-primary" /> Quantitative Trade Logger & Analytics
            </span>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1">
              Performance Journal & Behavioral Analytics
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1">
              Track Sharpe ratio, session win rates, psychology tags, and account equity curves.
            </p>
          </div>

          {/* Capacity Meter */}
          <div className="flex items-center gap-3 bg-secondary/80 px-4 py-2 rounded-lg border border-border">
            <div className="text-right text-xs">
              <span className="text-muted-foreground block text-[10px] uppercase font-bold">Free Plan Capacity</span>
              <span className="font-mono font-bold text-foreground">{totalTrades} / 50 Trades Logged</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsProModalOpen(true)}
              className="font-bold text-[11px]"
            >
              Upgrade Pro
            </Button>
          </div>
        </div>

        {/* METRICS KPIS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
          <GlassCard className="p-4 border-border">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Net Floating PnL</span>
            <span className={`text-2xl font-black font-mono ${netPnL >= 0 ? "text-profit" : "text-destructive"}`}>
              {netPnL >= 0 ? `+$${netPnL.toLocaleString()}` : `-$${Math.abs(netPnL).toLocaleString()}`}
            </span>
          </GlassCard>

          <GlassCard className="p-4 border-border">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Win Rate</span>
            <span className="text-2xl font-black font-mono text-primary">{winRate.toFixed(1)}%</span>
          </GlassCard>

          <GlassCard className="p-4 border-border">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Sharpe Ratio</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black font-mono text-foreground">1.85</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-bold">Pro Metric</span>
            </div>
          </GlassCard>

          <GlassCard className="p-4 border-border">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Total Trades</span>
            <span className="text-2xl font-black font-mono text-foreground">{totalTrades}</span>
          </GlassCard>
        </div>

        {/* PRO ANALYTICS SPOTLIGHT */}
        <GlassCard className="p-6 border-primary/40 bg-secondary/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit mb-1">
              <Sparkles className="w-3 h-3" /> Unlock Advanced Pro Journal Metrics
            </span>
            <h3 className="text-base font-bold text-foreground">
              Session Heatmaps, Expectancy Calculation & CSV Exporter
            </h3>
            <p className="text-xs text-muted-foreground font-light mt-0.5">
              Albireo Pro unlocks behavioral tags, win rate by session (London vs NY), and CSV export for tax & prop auditing.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsProModalOpen(true)}
            className="shrink-0 font-bold"
          >
            Unlock All Pro Metrics
          </Button>
        </GlassCard>

        {/* LOGGED TRADES TABLE */}
        <GlassCard className="p-0 overflow-x-auto border-border mt-2">
          <table className="w-full text-left text-xs border-collapse font-sora">
            <thead>
              <tr className="border-b border-border bg-secondary/80 text-muted-foreground">
                <th className="p-3">Date & Time</th>
                <th className="p-3">Symbol</th>
                <th className="p-3">Side</th>
                <th className="p-3">Volume</th>
                <th className="p-3">Entry</th>
                <th className="p-3">Exit</th>
                <th className="p-3">Strategy</th>
                <th className="p-3">Session</th>
                <th className="p-3">PnL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {trades.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-mono text-[11px] text-muted-foreground">{t.date.replace("T", " ")}</td>
                  <td className="p-3 font-bold text-foreground">{t.symbol}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.direction === "LONG" ? "bg-profit/20 text-profit" : "bg-destructive/20 text-destructive"}`}>
                      {t.direction}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{t.size} Lots</td>
                  <td className="p-3 font-mono">{t.entryPrice}</td>
                  <td className="p-3 font-mono">{t.exitPrice}</td>
                  <td className="p-3 font-medium text-foreground">{t.strategy}</td>
                  <td className="p-3 text-muted-foreground">{t.session}</td>
                  <td className={`p-3 font-mono font-bold ${t.pnl >= 0 ? "text-profit" : "text-destructive"}`}>
                    {t.pnl >= 0 ? `+$${t.pnl}` : `-$${Math.abs(t.pnl)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>

      {/* PRO MODAL */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </PageContainer>
  );
}
