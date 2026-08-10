"use client";

import React from "react";

export interface PairData {
  symbol: string;
  bid: number;
  ask: number;
  spread: number;
  change: string;
}

export interface TickerGridProps {
  pairs: PairData[];
  selectedPair: string;
  onSelectPair: (symbol: string) => void;
}

/**
 * Ticker Grid Child Component
 * Renders real-time quote tickers for ECN trading instruments.
 */
export default function TickerGrid({ pairs, selectedPair, onSelectPair }: TickerGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 font-mono">
      {pairs.map((p) => (
        <button
          key={p.symbol}
          type="button"
          onClick={() => onSelectPair(p.symbol)}
          className={`p-2.5 rounded text-left border transition-all cursor-pointer ${
            selectedPair === p.symbol
              ? "bg-[#00FF00]/10 border-[#00FF00] text-[#00FF00]"
              : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="text-xs font-bold">{p.symbol}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{p.bid}</div>
        </button>
      ))}
    </div>
  );
}
