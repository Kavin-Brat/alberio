"use client";

/**
 * Tradeflow Global - Main Forex Trading Terminal Cockpit
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Acts as the main orchestrating terminal cockpit layout,
 *   unifying market streams, chart displays, ticket execution, and position workspaces.
 * - Dependency Inversion Principle (DIP): Relies on custom market hooks (useForexMarket, useTradePositions)
 *   rather than monolithic inline state logic.
 */

import React, { useState } from "react";
import { CurrencyPairSymbol } from "@/types/tradeflow";
import { useForexMarket } from "@/hooks/useForexMarket";
import { useTradePositions } from "@/hooks/useTradePositions";
import { MarketWatch } from "./MarketWatch";
import { InteractiveChart } from "./InteractiveChart";
import { OrderEntryTicket } from "./OrderEntryTicket";
import { PositionManager } from "./PositionManager";
import { EconomicCalendarWidget } from "./EconomicCalendarWidget";
import { Shield, Cpu, Activity, DollarSign, Wallet, Percent, Award, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TradingTerminal() {
  const [selectedSymbol, setSelectedSymbol] = useState<CurrencyPairSymbol>("EUR/USD");
  const { quotes, activeQuote, candles } = useForexMarket(selectedSymbol);
  const { positions, history, accountSummary, executeOrder, closePosition } = useTradePositions();

  return (
    <div className="flex flex-col w-full h-auto lg:h-[calc(100vh-7rem)] bg-hero-bg text-foreground font-sora p-4 gap-4 overflow-hidden">
      {/* TOP ACCOUNT SUMMARY METRICS TICKER BAR */}
      <div className="w-full bg-secondary-dark border border-border rounded-lg px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10 text-primary border border-primary/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-foreground uppercase flex items-center gap-2">
              ALBIREO <span className="text-primary">TERMINAL</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-light">Institutional ECN Forex Terminal</p>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-sans">Balance</span>
              <span className="font-bold text-foreground">${accountSummary.balance.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-sans">Equity</span>
              <span className="font-bold text-primary">${accountSummary.equity.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-sans">Margin Used</span>
              <span className="font-bold text-foreground">${accountSummary.marginUsed.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-profit" />
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-sans">Free Margin</span>
              <span className="font-bold text-profit">${accountSummary.freeMargin.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-sans">Margin Level</span>
              <span className="font-bold text-primary">{accountSummary.marginLevelPercent}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-sans">Win Rate</span>
              <span className="font-bold text-yellow-400">{accountSummary.winRatePercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TERMINAL WORKSPACE GRID */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 h-full min-h-0 overflow-hidden">
        {/* LEFT COLUMN: MarketWatch Watchlist */}
        <div className="lg:col-span-3 h-full min-h-0">
          <MarketWatch
            quotes={quotes}
            selectedSymbol={selectedSymbol}
            onSelectSymbol={setSelectedSymbol}
          />
        </div>

        {/* CENTER COLUMN: Interactive Chart & Position Workspace */}
        <div className="lg:col-span-6 flex flex-col gap-4 h-full min-h-0">
          {/* Top Chart Cockpit */}
          <div className="h-[58%] min-h-0">
            <InteractiveChart
              symbol={selectedSymbol}
              quote={activeQuote}
              candles={candles}
            />
          </div>

          {/* Bottom Position Workspace */}
          <div className="h-[42%] min-h-0">
            <PositionManager
              positions={positions}
              history={history}
              accountSummary={accountSummary}
              onClosePosition={closePosition}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Order Ticket & Economic Calendar */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-full min-h-0">
          <div className="h-[62%] min-h-0">
            <OrderEntryTicket
              symbol={selectedSymbol}
              quote={activeQuote}
              accountSummary={accountSummary}
              onExecuteOrder={executeOrder}
            />
          </div>

          <div className="h-[38%] min-h-0">
            <EconomicCalendarWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingTerminal;
