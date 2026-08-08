"use client";

/**
 * Tradeflow Global - MarketWatch Single Item Sub-Component
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Renders an individual currency pair row
 *   with green/red price direction pulses and selection handlers.
 */

import React from "react";
import { ForexQuote } from "@/types/tradeflow";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketWatchItemProps {
  quote: ForexQuote;
  isSelected: boolean;
  onSelect: () => void;
}

export function MarketWatchItem({ quote, isSelected, onSelect }: MarketWatchItemProps) {
  const isUp = quote.priceDirection === "UP";
  const isDown = quote.priceDirection === "DOWN";
  const isJpy = quote.symbol === "USD/JPY";
  const decimals = isJpy ? 3 : 5;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full grid grid-cols-12 items-center px-4 py-3 text-left transition-all duration-200 cursor-pointer group hover:bg-muted/40",
        isSelected ? "bg-primary/10 border-l-2 border-primary" : "bg-transparent"
      )}
    >
      {/* Symbol & 24h Change */}
      <div className="col-span-4 flex flex-col">
        <span
          className={cn(
            "text-xs font-bold tracking-tight transition-colors",
            isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
          )}
        >
          {quote.symbol}
        </span>
        <span
          className={cn(
            "text-[10px] font-medium flex items-center gap-0.5",
            quote.changePercent24h >= 0 ? "text-profit" : "text-loss"
          )}
        >
          {quote.changePercent24h >= 0 ? (
            <TrendingUp className="w-2.5 h-2.5" />
          ) : (
            <TrendingDown className="w-2.5 h-2.5" />
          )}
          {quote.changePercent24h >= 0 ? "+" : ""}
          {quote.changePercent24h}%
        </span>
      </div>

      {/* Bid Quote */}
      <div
        className={cn(
          "col-span-3 text-right text-xs font-mono font-medium transition-colors rounded-xs px-1 py-0.5",
          isUp
            ? "bg-profit/20 text-profit font-bold animate-pulse"
            : isDown
            ? "bg-loss/20 text-loss font-bold animate-pulse"
            : "text-foreground"
        )}
      >
        {quote.bid.toFixed(decimals)}
      </div>

      {/* Ask Quote */}
      <div
        className={cn(
          "col-span-3 text-right text-xs font-mono font-medium transition-colors rounded-xs px-1 py-0.5",
          isUp
            ? "bg-profit/20 text-profit font-bold animate-pulse"
            : isDown
            ? "bg-loss/20 text-loss font-bold animate-pulse"
            : "text-foreground"
        )}
      >
        {quote.ask.toFixed(decimals)}
      </div>

      {/* Spread Pips */}
      <div className="col-span-2 text-right text-[10px] font-mono text-muted-foreground">
        {quote.spreadPips}p
      </div>
    </button>
  );
}

export default MarketWatchItem;
