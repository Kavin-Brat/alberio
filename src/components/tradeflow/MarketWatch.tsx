"use client";

/**
 * Tradeflow Global - Real-Time MarketWatch Panel
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Renders the pair watchlist, live bid/ask quotes,
 *   spreads, and 24h percentage changes.
 */

import React from "react";
import { CurrencyPairSymbol, ForexQuote } from "@/types/tradeflow";
import { TrendingUp, TrendingDown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketWatchProps {
  quotes: Map<CurrencyPairSymbol, ForexQuote>;
  selectedSymbol: CurrencyPairSymbol;
  onSelectSymbol: (symbol: CurrencyPairSymbol) => void;
}

export function MarketWatch({ quotes, selectedSymbol, onSelectSymbol }: MarketWatchProps) {
  const symbolList = Array.from(quotes.values());

  return (
    <div className="flex flex-col h-full bg-secondary-dark border border-border rounded-lg overflow-hidden font-sora shadow-xl">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-hero-bg/80 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">
            MarketWatch
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/30 px-2 py-0.5 rounded-xs border border-border">
          Live ECN
        </span>
      </div>

      {/* Symbol Table Header */}
      <div className="grid grid-cols-12 px-4 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border bg-hero-bg/40">
        <div className="col-span-4">Pair</div>
        <div className="col-span-3 text-right">Bid</div>
        <div className="col-span-3 text-right">Ask</div>
        <div className="col-span-2 text-right">Spread</div>
      </div>

      {/* Watchlist Symbol Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/40">
        {symbolList.map((quote) => {
          const isSelected = quote.symbol === selectedSymbol;
          const isUp = quote.priceDirection === "UP";
          const isDown = quote.priceDirection === "DOWN";

          return (
            <button
              key={quote.symbol}
              onClick={() => onSelectSymbol(quote.symbol)}
              className={cn(
                "w-full grid grid-cols-12 items-center px-4 py-3 text-left transition-all duration-200 cursor-pointer group hover:bg-muted/40",
                isSelected ? "bg-primary/10 border-l-2 border-primary" : "bg-transparent"
              )}
            >
              {/* Symbol & 24h Change */}
              <div className="col-span-4 flex flex-col">
                <span className={cn(
                  "text-xs font-bold tracking-tight transition-colors",
                  isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                )}>
                  {quote.symbol}
                </span>
                <span className={cn(
                  "text-[10px] font-medium flex items-center gap-0.5",
                  quote.changePercent24h >= 0 ? "text-profit" : "text-loss"
                )}>
                  {quote.changePercent24h >= 0 ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  {quote.changePercent24h >= 0 ? "+" : ""}{quote.changePercent24h}%
                </span>
              </div>

              {/* Bid Quote */}
              <div className={cn(
                "col-span-3 text-right text-xs font-mono font-medium transition-colors rounded-xs px-1 py-0.5",
                isUp ? "bg-profit/20 text-profit font-bold animate-pulse" : isDown ? "bg-loss/20 text-loss font-bold animate-pulse" : "text-foreground"
              )}>
                {quote.bid.toFixed(quote.symbol === "USD/JPY" ? 3 : 5)}
              </div>

              {/* Ask Quote */}
              <div className={cn(
                "col-span-3 text-right text-xs font-mono font-medium transition-colors rounded-xs px-1 py-0.5",
                isUp ? "bg-profit/20 text-profit font-bold animate-pulse" : isDown ? "bg-loss/20 text-loss font-bold animate-pulse" : "text-foreground"
              )}>
                {quote.ask.toFixed(quote.symbol === "USD/JPY" ? 3 : 5)}
              </div>

              {/* Spread Pips */}
              <div className="col-span-2 text-right text-[10px] font-mono text-muted-foreground">
                {quote.spreadPips}p
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MarketWatch;
