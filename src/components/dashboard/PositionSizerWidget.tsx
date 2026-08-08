"use client";

import React, { useState, useEffect } from "react";
import { Calculator, ShieldAlert } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";

export function PositionSizerWidget() {
  const [balance, setBalance] = useState<number>(100000);
  const [riskPct, setRiskPct] = useState<number>(1.0);
  const [stopLoss, setStopLoss] = useState<number>(20);
  const [instrument, setInstrument] = useState<"forex" | "gold" | "btc">("forex");

  const [positionSize, setPositionSize] = useState<number>(0);
  const [cashRisk, setCashRisk] = useState<number>(0);

  useEffect(() => {
    const riskAmount = balance * (riskPct / 100);
    setCashRisk(riskAmount);

    let size = 0;
    if (stopLoss > 0) {
      if (instrument === "forex") {
        // Standard Lot: $10 per pip per 1.0 lot
        size = riskAmount / (stopLoss * 10);
      } else if (instrument === "gold") {
        // Gold: $10 per $1 move per 10 oz
        size = riskAmount / stopLoss;
      } else {
        // BTC
        size = riskAmount / stopLoss;
      }
    }

    setPositionSize(parseFloat(size.toFixed(2)));
  }, [balance, riskPct, stopLoss, instrument]);

  return (
    <GlassCard id="position-sizer" className="w-full my-8 scroll-mt-24">
      <div className="flex flex-col gap-5 font-sora">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="font-bold text-xs uppercase tracking-wider text-foreground">
              Position Sizer Engine
            </span>
          </div>
          <span className="text-[10px] text-primary font-bold bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-xs">
            Live Math
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Account Balance ($)</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-xs font-bold text-foreground focus:outline-hidden focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Instrument Specs</label>
              <div className="grid grid-cols-3 gap-2">
                {(["forex", "gold", "btc"] as const).map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setInstrument(inst)}
                    className={`text-[10px] font-bold py-2 rounded-sm border capitalize cursor-pointer transition-all ${
                      instrument === inst
                        ? "bg-primary border-primary text-primary-foreground shadow-[0_0_10px_rgba(34,230,0,0.4)]"
                        : "bg-hero-bg border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {inst === "btc" ? "Bitcoin" : inst}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Risk Percentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPct}
                  onChange={(e) => setRiskPct(Number(e.target.value))}
                  className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-xs font-bold text-foreground focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">
                  Stop Loss ({instrument === "forex" ? "Pips" : "Pts/$"})
                </label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  className="w-full bg-hero-bg border border-border rounded-sm px-3 py-2 text-xs font-bold text-foreground focus:outline-hidden focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="bg-hero-bg/80 border border-border rounded-sm p-5 flex flex-col justify-center gap-4 relative">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Recommended Size</span>
              <span className="text-3xl font-bold text-primary mt-1 font-mono">
                {positionSize}{" "}
                <span className="text-xs text-muted-foreground font-bold tracking-wider font-sora">
                  {instrument === "forex" ? "Lots" : instrument === "gold" ? "Ounces" : "Contracts"}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-border pt-4 text-xs font-mono">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-sora">Cash at Risk</span>
                <span className="font-bold text-loss">${cashRisk.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-sora">Leverage Model</span>
                <span className="font-bold text-foreground">Standard 1:100</span>
              </div>
            </div>

            <div className="flex gap-2 items-start text-[10px] text-muted-foreground bg-secondary p-2 rounded-sm border border-border font-sora">
              <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Calculated assuming standard lot specifications ($10/pip for EUR/USD per 1.0 Lot).</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default PositionSizerWidget;
