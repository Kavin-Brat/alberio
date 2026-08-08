"use client";

/**
 * Tradeflow Global - Leverage Gauge Sub-Component
 * 
 * SOLID Principles Applied:
 * - Single Responsibility Principle (SRP): Handles financial leverage selection,
 *   margin calculation displays, and utilization progress bars.
 */

import React from "react";
import { LEVERAGE_OPTIONS } from "@/constants/tradeflow";
import { cn } from "@/lib/utils";

interface LeverageGaugeProps {
  leverage: number;
  onLeverageChange: (val: number) => void;
  requiredMargin: number;
  freeMargin: number;
}

export function LeverageGauge({
  leverage,
  onLeverageChange,
  requiredMargin,
  freeMargin,
}: LeverageGaugeProps) {
  const marginRatioPercent = freeMargin > 0 ? (requiredMargin / freeMargin) * 100 : 0;

  return (
    <div className="p-3 bg-hero-bg/60 border border-border rounded-md flex flex-col gap-2 font-sora">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">FINANCIAL LEVERAGE</span>
        <select
          value={leverage}
          onChange={(e) => onLeverageChange(Number(e.target.value))}
          className="bg-secondary border border-border text-xs font-mono font-bold text-primary rounded-xs px-2 py-1 focus:outline-hidden cursor-pointer"
        >
          {LEVERAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-muted-foreground">Required Margin:</span>
        <span className="text-foreground font-bold">${requiredMargin.toFixed(2)}</span>
      </div>

      {/* Margin Utilization Progress Bar */}
      <div className="w-full h-1.5 bg-hero-bg rounded-full overflow-hidden border border-border">
        <div
          className={cn(
            "h-full transition-all duration-300",
            marginRatioPercent > 80 ? "bg-loss" : marginRatioPercent > 50 ? "bg-yellow-500" : "bg-primary"
          )}
          style={{ width: `${Math.min(100, marginRatioPercent)}%` }}
        />
      </div>
    </div>
  );
}

export default LeverageGauge;
