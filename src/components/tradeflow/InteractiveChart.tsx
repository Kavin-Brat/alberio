"use client";

/**
 * Tradeflow Global - Interactive Candlestick & Technical Chart Component
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Renders price candlestick visualizer,
 *   technical indicator overlays (EMA, RSI), timeframe toggles, and live price tracking.
 */

import React, { useState } from "react";
import { CandlestickBar, CurrencyPairSymbol, ForexQuote } from "@/types/tradeflow";
import { BarChart2, Activity, Layers, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar,
  ReferenceLine,
} from "recharts";

interface InteractiveChartProps {
  symbol: CurrencyPairSymbol;
  quote?: ForexQuote;
  candles: CandlestickBar[];
}

export function InteractiveChart({ symbol, quote, candles }: InteractiveChartProps) {
  const [timeframe, setTimeframe] = useState<"1M" | "5M" | "15M" | "1H" | "1D">("5M");
  const [chartType, setChartType] = useState<"CANDLE" | "LINE">("CANDLE");
  const [showEma20, setShowEma20] = useState(true);
  const [showEma50, setShowEma50] = useState(true);
  const [showRsi, setShowRsi] = useState(true);

  const isJpy = symbol === "USD/JPY";
  const decimals = isJpy ? 3 : 5;

  return (
    <div className="flex flex-col h-full bg-secondary-dark border border-border rounded-lg overflow-hidden font-sora shadow-xl">
      {/* Chart Control Header */}
      <div className="px-4 py-3 bg-hero-bg/80 border-b border-border flex flex-wrap items-center justify-between gap-3">
        {/* Symbol Title & Live Quote Ticker */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            <span className="font-bold text-base text-foreground tracking-tight uppercase">
              {symbol}
            </span>
          </div>

          {quote && (
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-muted-foreground">BID: <strong className="text-foreground">{quote.bid.toFixed(decimals)}</strong></span>
              <span className="text-muted-foreground">ASK: <strong className="text-foreground">{quote.ask.toFixed(decimals)}</strong></span>
              <span className={cn(
                "px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase",
                quote.changePercent24h >= 0 ? "bg-profit/15 text-profit border border-profit/30" : "bg-loss/15 text-loss border border-loss/30"
              )}>
                {quote.changePercent24h >= 0 ? "+" : ""}{quote.changePercent24h}%
              </span>
            </div>
          )}
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Timeframe Selectors */}
          <div className="flex items-center bg-hero-bg border border-border rounded-md p-0.5">
            {(["1M", "5M", "15M", "1H", "1D"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={cn(
                  "px-2.5 py-1 text-[10px] font-bold rounded-xs transition-colors cursor-pointer",
                  timeframe === tf ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center bg-hero-bg border border-border rounded-md p-0.5">
            <button
              onClick={() => setChartType("CANDLE")}
              className={cn(
                "px-2.5 py-1 text-[10px] font-bold rounded-xs transition-colors cursor-pointer",
                chartType === "CANDLE" ? "bg-secondary text-foreground border border-border" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Candle
            </button>
            <button
              onClick={() => setChartType("LINE")}
              className={cn(
                "px-2.5 py-1 text-[10px] font-bold rounded-xs transition-colors cursor-pointer",
                chartType === "LINE" ? "bg-secondary text-foreground border border-border" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Line
            </button>
          </div>

          {/* Indicator Toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowEma20(!showEma20)}
              className={cn(
                "px-2 py-1 text-[10px] font-bold rounded-xs border transition-colors cursor-pointer",
                showEma20 ? "bg-primary/15 text-primary border-primary/40" : "bg-transparent text-muted-foreground border-border"
              )}
            >
              EMA 20
            </button>
            <button
              onClick={() => setShowEma50(!showEma50)}
              className={cn(
                "px-2 py-1 text-[10px] font-bold rounded-xs border transition-colors cursor-pointer",
                showEma50 ? "bg-accent/15 text-primary border-primary/40" : "bg-transparent text-muted-foreground border-border"
              )}
            >
              EMA 50
            </button>
            <button
              onClick={() => setShowRsi(!showRsi)}
              className={cn(
                "px-2 py-1 text-[10px] font-bold rounded-xs border transition-colors cursor-pointer",
                showRsi ? "bg-neon-violet/15 text-neon-violet border-neon-violet/40" : "bg-transparent text-muted-foreground border-border"
              )}
            >
              RSI 14
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="flex-1 w-full p-4 relative min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={candles} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <XAxis dataKey="timeLabel" stroke="hsl(0 0% 40%)" fontSize={10} tickLine={false} />
            <YAxis
              domain={['auto', 'auto']}
              orientation="right"
              stroke="hsl(0 0% 40%)"
              fontSize={10}
              tickFormatter={(val) => val.toFixed(decimals)}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(12, 14, 18, 0.95)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '11px',
                fontFamily: 'Sora, sans-serif',
              }}
              formatter={(value: any, name: any) => [
                typeof value === 'number' ? value.toFixed(decimals) : value,
                name.toUpperCase(),
              ]}
            />

            {quote && (
              <ReferenceLine y={quote.bid} stroke="hsl(119 99% 46%)" strokeDasharray="3 3" label={{ value: `BID ${quote.bid}`, fill: '#57F287', fontSize: 10, position: 'right' }} />
            )}

            {/* Candlestick / Line Render */}
            {chartType === "CANDLE" ? (
              <Bar
                dataKey="close"
                fill="hsl(119 99% 46%)"
                radius={[2, 2, 0, 0]}
                barSize={6}
              />
            ) : (
              <Line
                type="monotone"
                dataKey="close"
                stroke="hsl(119 99% 46%)"
                strokeWidth={2}
                dot={false}
              />
            )}

            {showEma20 && <Line type="monotone" dataKey="ema20" stroke="#38bdf8" strokeWidth={1.5} dot={false} name="EMA 20" />}
            {showEma50 && <Line type="monotone" dataKey="ema50" stroke="#a855f7" strokeWidth={1.5} dot={false} name="EMA 50" />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* RSI Sub-Panel */}
      {showRsi && (
        <div className="h-24 border-t border-border px-4 py-2 bg-hero-bg/40">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
            <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-neon-violet" /> Relative Strength Index (RSI 14)</span>
            <span className="font-mono text-foreground font-bold">
              {candles.length > 0 ? candles[candles.length - 1].rsi14 : 50}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={50}>
            <ComposedChart data={candles} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
              <YAxis domain={[0, 100]} orientation="right" stroke="hsl(0 0% 30%)" fontSize={8} ticks={[30, 70]} />
              <ReferenceLine y={70} stroke="rgba(239, 68, 68, 0.5)" strokeDasharray="2 2" />
              <ReferenceLine y={30} stroke="rgba(16, 185, 129, 0.5)" strokeDasharray="2 2" />
              <Line type="monotone" dataKey="rsi14" stroke="#a855f7" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default InteractiveChart;
