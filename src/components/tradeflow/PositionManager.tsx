"use client";

/**
 * Tradeflow Global - Real-Time Position Manager & Trade History Component
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Displays active trade positions,
 *   live PnL calculations, pending orders, and closed trade accounting logs.
 */

import React, { useState } from "react";
import { Position, AccountSummary } from "@/types/tradeflow";
import { Layers, History, DollarSign, XCircle, ArrowUpRight, ArrowDownRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface PositionManagerProps {
  positions: Position[];
  history: Position[];
  accountSummary: AccountSummary;
  onClosePosition: (positionId: string) => { success: boolean; message: string };
}

export function PositionManager({
  positions,
  history,
  accountSummary,
  onClosePosition,
}: PositionManagerProps) {
  const [activeTab, setActiveTab] = useState<"POSITIONS" | "HISTORY">("POSITIONS");

  return (
    <div className="flex flex-col h-full bg-secondary-dark border border-border rounded-lg overflow-hidden font-sora shadow-xl">
      {/* Tab Navigation Header */}
      <div className="px-4 py-2.5 bg-hero-bg/80 border-b border-border flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("POSITIONS")}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer",
              activeTab === "POSITIONS" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Layers className="w-3.5 h-3.5" /> Open Positions ({positions.length})
          </button>
          <button
            onClick={() => setActiveTab("HISTORY")}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer",
              activeTab === "HISTORY" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <History className="w-3.5 h-3.5" /> History ({history.length})
          </button>
        </div>

        {/* Live Account Equity Pill Ticker */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
          <span className="text-muted-foreground">Equity: <strong className="text-foreground">${accountSummary.equity.toLocaleString()}</strong></span>
          <span className="text-muted-foreground">Free Margin: <strong className="text-foreground">${accountSummary.freeMargin.toLocaleString()}</strong></span>
          <span className="text-muted-foreground">Margin Level: <strong className="text-primary">{accountSummary.marginLevelPercent}%</strong></span>
        </div>
      </div>

      {/* Main Table Body */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        {activeTab === "POSITIONS" ? (
          positions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <Layers className="w-8 h-8 text-muted-foreground/40 mb-2" />
              <p className="text-xs text-muted-foreground font-light">No active market positions open.</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Select a currency pair and execute a Buy or Sell ticket to begin trading.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs font-sora border-collapse">
              <thead>
                <tr className="bg-hero-bg/60 border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  <th className="px-4 py-2.5">ID</th>
                  <th className="px-4 py-2.5">Symbol</th>
                  <th className="px-4 py-2.5">Side</th>
                  <th className="px-4 py-2.5 text-right">Lots</th>
                  <th className="px-4 py-2.5 text-right">Entry Price</th>
                  <th className="px-4 py-2.5 text-right">Mark Price</th>
                  <th className="px-4 py-2.5 text-right">Margin</th>
                  <th className="px-4 py-2.5 text-right">Unrealized PnL</th>
                  <th className="px-4 py-2.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono">
                {positions.map((pos) => {
                  const isProfit = pos.unrealizedPnL >= 0;
                  return (
                    <tr key={pos.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-bold text-foreground">{pos.id}</td>
                      <td className="px-4 py-3 font-bold text-primary">{pos.symbol}</td>
                      <td className="px-4 py-3 font-bold">
                        <span className={cn(
                          "px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase inline-flex items-center gap-1",
                          pos.side === "BUY" ? "bg-profit/15 text-profit border border-profit/30" : "bg-loss/15 text-loss border border-loss/30"
                        )}>
                          {pos.side === "BUY" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {pos.side}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-foreground font-bold">{pos.volumeLots}</td>
                      <td className="px-4 py-3 text-right text-foreground">{pos.entryPrice}</td>
                      <td className="px-4 py-3 text-right text-foreground">{pos.currentPrice}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">${pos.marginUsed.toFixed(2)}</td>
                      <td className={cn("px-4 py-3 text-right font-bold text-sm", isProfit ? "text-profit" : "text-loss")}>
                        {isProfit ? "+" : ""}${pos.unrealizedPnL.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          onClick={() => onClosePosition(pos.id)}
                          variant="danger"
                          size="sm"
                          className="px-2.5 py-1 text-[10px]"
                        >
                          Close
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        ) : (
          history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <History className="w-8 h-8 text-muted-foreground/40 mb-2" />
              <p className="text-xs text-muted-foreground font-light">No closed trade records logged in history.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs font-sora border-collapse">
              <thead>
                <tr className="bg-hero-bg/60 border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  <th className="px-4 py-2.5">ID</th>
                  <th className="px-4 py-2.5">Symbol</th>
                  <th className="px-4 py-2.5">Side</th>
                  <th className="px-4 py-2.5 text-right">Lots</th>
                  <th className="px-4 py-2.5 text-right">Entry</th>
                  <th className="px-4 py-2.5 text-right">Close Price</th>
                  <th className="px-4 py-2.5 text-right">Realized PnL</th>
                  <th className="px-4 py-2.5 text-right">Closed Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono">
                {history.map((pos) => {
                  const isProfit = pos.realizedPnL >= 0;
                  return (
                    <tr key={pos.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-bold text-foreground">{pos.id}</td>
                      <td className="px-4 py-3 font-bold text-primary">{pos.symbol}</td>
                      <td className="px-4 py-3 font-bold">
                        <span className={cn(
                          "px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase",
                          pos.side === "BUY" ? "bg-profit/15 text-profit" : "bg-loss/15 text-loss"
                        )}>
                          {pos.side}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-foreground">{pos.volumeLots}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{pos.entryPrice}</td>
                      <td className="px-4 py-3 text-right text-foreground">{pos.currentPrice}</td>
                      <td className={cn("px-4 py-3 text-right font-bold text-sm", isProfit ? "text-profit" : "text-loss")}>
                        {isProfit ? "+" : ""}${pos.realizedPnL.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground text-[10px]">
                        {pos.closeTime ? new Date(pos.closeTime).toLocaleTimeString() : "---"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}

export default PositionManager;
