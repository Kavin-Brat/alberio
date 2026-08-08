"use client";

/**
 * Tradeflow Global - Order Execution Ticket Component
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Handles order ticket parameter input,
 *   stop loss/take profit valuation, and delegates leverage calculation to LeverageGauge.
 */

import React, { useState } from "react";
import { CurrencyPairSymbol, ForexQuote, TradeSide, OrderType, AccountSummary } from "@/types/tradeflow";
import { Zap, ArrowUpRight, ArrowDownRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import LeverageGauge from "./LeverageGauge";

interface OrderEntryTicketProps {
  symbol: CurrencyPairSymbol;
  quote?: ForexQuote;
  accountSummary: AccountSummary;
  onExecuteOrder: (params: {
    symbol: CurrencyPairSymbol;
    side: TradeSide;
    type: OrderType;
    volumeLots: number;
    stopLossPips?: number;
    takeProfitPips?: number;
    leverage: number;
  }) => { success: boolean; message: string };
}

export function OrderEntryTicket({
  symbol,
  quote,
  accountSummary,
  onExecuteOrder,
}: OrderEntryTicketProps) {
  const [side, setSide] = useState<TradeSide>("BUY");
  const [orderType] = useState<OrderType>("MARKET");
  const [lots, setLots] = useState<number>(0.1);
  const [leverage, setLeverage] = useState<number>(100);
  const [stopLossPips, setStopLossPips] = useState<number>(20);
  const [takeProfitPips, setTakeProfitPips] = useState<number>(40);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isJpy = symbol === "USD/JPY";
  const decimals = isJpy ? 3 : 5;
  const entryPrice = quote ? (side === "BUY" ? quote.ask : quote.bid) : 1.0;

  // Margin calculation (1 Lot = 100,000 units)
  const notionalValue = lots * 100000 * entryPrice;
  const requiredMargin = notionalValue / leverage;

  // Risk / Reward Calculation ($ value per pip = lots * $10 for standard pair)
  const pipValueUSD = lots * 10;
  const slDollarRisk = stopLossPips * pipValueUSD;
  const tpDollarReward = takeProfitPips * pipValueUSD;
  const rrRatio = stopLossPips > 0 ? (takeProfitPips / stopLossPips).toFixed(2) : "0.00";

  const handleExecute = () => {
    setFeedback(null);
    const result = onExecuteOrder({
      symbol,
      side,
      type: orderType,
      volumeLots: lots,
      stopLossPips,
      takeProfitPips,
      leverage,
    });

    if (result.success) {
      setFeedback({ type: "success", text: result.message });
    } else {
      setFeedback({ type: "error", text: result.message });
    }

    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-secondary-dark border border-border rounded-lg overflow-hidden font-sora shadow-xl">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-hero-bg/80 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">
            Order Entry Ticket
          </span>
        </div>
        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-xs border border-primary/30 uppercase">
          {symbol}
        </span>
      </div>

      {/* Ticket Body */}
      <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
        {/* BUY / SELL Side Selector Tabs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSide("BUY")}
            className={cn(
              "py-3 px-3 rounded-md flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border",
              side === "BUY"
                ? "bg-profit text-primary-foreground border-profit shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "bg-hero-bg text-muted-foreground border-border hover:border-profit/50"
            )}
          >
            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> BUY MARKET
            </span>
            <span className="text-sm font-mono font-bold">
              {quote ? quote.ask.toFixed(decimals) : "---"}
            </span>
          </button>

          <button
            onClick={() => setSide("SELL")}
            className={cn(
              "py-3 px-3 rounded-md flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border",
              side === "SELL"
                ? "bg-loss text-white border-loss shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                : "bg-hero-bg text-muted-foreground border-border hover:border-loss/50"
            )}
          >
            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1">
              <ArrowDownRight className="w-4 h-4" /> SELL MARKET
            </span>
            <span className="text-sm font-mono font-bold">
              {quote ? quote.bid.toFixed(decimals) : "---"}
            </span>
          </button>
        </div>

        {/* Volume Lots Selector */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>POSITION VOLUME (LOTS)</span>
            <span className="text-foreground font-mono font-bold">{(lots * 100000).toLocaleString()} Units</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.01"
              min="0.01"
              max="10.0"
              value={lots}
              onChange={(e) => setLots(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
              className="flex-1 bg-hero-bg border border-border rounded-md px-3 py-2 text-sm font-mono font-bold text-foreground focus:outline-hidden focus:border-primary"
            />
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLots(parseFloat((lots + 0.01).toFixed(2)))}
                className="px-2 py-1 bg-hero-bg border border-border hover:border-primary text-xs font-mono text-foreground rounded-xs cursor-pointer"
              >
                +0.01
              </button>
              <button
                onClick={() => setLots(parseFloat((lots + 0.1).toFixed(2)))}
                className="px-2 py-1 bg-hero-bg border border-border hover:border-primary text-xs font-mono text-foreground rounded-xs cursor-pointer"
              >
                +0.1
              </button>
              <button
                onClick={() => setLots(parseFloat((lots + 1.0).toFixed(2)))}
                className="px-2 py-1 bg-hero-bg border border-border hover:border-primary text-xs font-mono text-foreground rounded-xs cursor-pointer"
              >
                +1.0
              </button>
            </div>
          </div>
        </div>

        {/* Leverage & Margin Requirement Gauge Sub-Component */}
        <LeverageGauge
          leverage={leverage}
          onLeverageChange={setLeverage}
          requiredMargin={requiredMargin}
          freeMargin={accountSummary.freeMargin}
        />

        {/* Risk Management: SL & TP */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Stop Loss (Pips)</span>
            <input
              type="number"
              min="0"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(Math.max(0, Number(e.target.value)))}
              className="bg-hero-bg border border-border rounded-md px-2.5 py-1.5 text-xs font-mono text-foreground focus:outline-hidden focus:border-loss"
            />
            <span className="text-[10px] font-mono text-loss font-semibold">Risk: -${slDollarRisk.toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Take Profit (Pips)</span>
            <input
              type="number"
              min="0"
              value={takeProfitPips}
              onChange={(e) => setTakeProfitPips(Math.max(0, Number(e.target.value)))}
              className="bg-hero-bg border border-border rounded-md px-2.5 py-1.5 text-xs font-mono text-foreground focus:outline-hidden focus:border-profit"
            />
            <span className="text-[10px] font-mono text-profit font-semibold">Reward: +${tpDollarReward.toFixed(2)}</span>
          </div>
        </div>

        {/* Risk/Reward Metric Badge */}
        <div className="flex items-center justify-between text-xs px-3 py-2 bg-hero-bg border border-border rounded-md">
          <span className="text-muted-foreground font-medium">Risk : Reward Ratio</span>
          <span className="font-mono font-bold text-primary">1 : {rrRatio}</span>
        </div>

        {/* Feedback Alert Toast */}
        {feedback && (
          <div
            className={cn(
              "p-3 rounded-md text-xs font-medium flex items-center gap-2 animate-fade-in",
              feedback.type === "success"
                ? "bg-profit/15 text-profit border border-profit/30"
                : "bg-loss/15 text-loss border border-loss/30"
            )}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-profit" />
            ) : (
              <ShieldAlert className="w-4 h-4 shrink-0 text-loss" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Instant Execution Button */}
        <Button
          onClick={handleExecute}
          variant={side === "BUY" ? "primary" : "danger"}
          size="lg"
          className="w-full py-4 text-sm font-bold uppercase tracking-wider mt-auto"
        >
          {side} {symbol} ({lots} Lot)
        </Button>
      </div>
    </div>
  );
}

export default OrderEntryTicket;
