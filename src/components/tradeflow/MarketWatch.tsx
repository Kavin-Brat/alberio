"use client";

/**
 * Tradeflow Global - Real-Time MarketWatch Panel
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Renders the pair watchlist container, header,
 *   and delegates row rendering to MarketWatchItem sub-component.
 */

import React from "react";
import { CurrencyPairSymbol, ForexQuote } from "@/types/tradeflow";
import { Shield } from "lucide-react";
import MarketWatchItem from "./MarketWatchItem";

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

      {/* Watchlist Symbol Items List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/40">
        {symbolList.map((quote) => (
          <MarketWatchItem
            key={quote.symbol}
            quote={quote}
            isSelected={quote.symbol === selectedSymbol}
            onSelect={() => onSelectSymbol(quote.symbol)}
          />
        ))}
      </div>
    </div>
  );
}

export default MarketWatch;
