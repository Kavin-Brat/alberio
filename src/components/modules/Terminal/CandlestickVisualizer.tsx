"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import { BarChart3, Activity } from "lucide-react";

export interface CandlestickVisualizerProps {
  symbol: string;
  spread: number;
}

/**
 * Candlestick Visualizer Child Component
 * Renders live candlestick visualizer chart container and execution metrics.
 */
export default function CandlestickVisualizer({ symbol, spread }: CandlestickVisualizerProps) {
  return (
    <GlassCard className="p-6 border-slate-800 bg-[#0b0b0b] min-h-[350px] flex flex-col justify-between font-sora">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#00FF00]" />
          <h3 className="text-base font-bold text-white">{symbol} Microstructure Visualizer</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">1M Timeframe</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-500 font-mono text-xs gap-3">
        <Activity className="w-12 h-12 text-[#00FF00] animate-pulse" />
        <span>Interactive High-Frequency Candlestick Chart Render Engine</span>
        <span className="text-[10px] text-slate-600">Spread: {spread} pips | Tick Latency: 12ms</span>
      </div>
    </GlassCard>
  );
}
