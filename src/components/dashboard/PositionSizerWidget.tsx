"use client";

import { useState, useEffect } from "react";
import { Calculator, ShieldAlert } from "lucide-react";
import Card from "@/components/ui/Card";

type InstrumentType = "forex" | "gold" | "btc";

/**
 * PositionSizerWidget Component
 * 
 * Interactive position sizing calculator.
 * Supports calculations for standard forex lot lots, gold ounces, and bitcoin contract scales,
 * factoring in starting balance and custom stop loss parameters.
 */
export default function PositionSizerWidget() {
  const [balance, setBalance] = useState<number>(100000);
  const [riskPct, setRiskPct] = useState<number>(1);
  const [stopLoss, setStopLoss] = useState<number>(20); // in pips/points
  const [instrument, setInstrument] = useState<InstrumentType>("forex");

  const [riskAmount, setRiskAmount] = useState<number>(1000);
  const [positionSize, setPositionSize] = useState<number>(5.0); // Standard Lots / Contracts

  useEffect(() => {
    // 1. Calculate risk in USD
    const usdRisk = balance * (riskPct / 100);
    setRiskAmount(usdRisk);

    // 2. Calculate position size depending on the instrument contract spec
    let size = 0;
    if (instrument === "forex") {
      // For forex, 1 standard lot = $10 per pip (assuming USD quote like EUR/USD, GBP/USD)
      // Position Size (Lots) = Risk Amount / (Stop Loss in Pips * $10)
      size = usdRisk / (stopLoss * 10);
    } else if (instrument === "gold") {
      // For Gold, 1 standard lot = $100 per point or $10 per 10-cent change.
      // Typically, 1 lot of XAU = $10 profit/loss per $0.10 move ($100 per $1.00 move).
      // Let's assume Stop Loss is in Gold points ($1.00 moves).
      // Pip/Point value = $100 per standard lot for $1 move.
      // Size = Risk / (Stop Loss in points * 100)
      size = usdRisk / (stopLoss * 100);
    } else if (instrument === "btc") {
      // For BTC, 1 contract/lot = $1 per $1.00 price change.
      // Size = Risk / Stop Loss in USD points
      size = usdRisk / stopLoss;
    }

    setPositionSize(parseFloat(size.toFixed(2)));
  }, [balance, riskPct, stopLoss, instrument]);

  return (
    <Card id="position-sizer" className="w-full shadow-2xl relative my-8 scroll-mt-24">
      {/* Background decoration */}
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-cygnus-gold/5 rounded-full blur-xl pointer-events-none" />

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-border-custom/50 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-cygnus-gold" />
            <span className="font-extrabold text-sm uppercase tracking-wider text-text-primary">
              Interactive Position Size Sizer
            </span>
          </div>
          <span className="text-[10px] text-profit font-semibold bg-profit/15 border border-profit/20 px-2 py-0.5 rounded">
            Live Calculator
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="flex flex-col gap-4">
            {/* Account Balance */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Account Balance ($)</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs font-bold text-text-primary focus:outline-none focus:border-cygnus-gold"
              />
            </div>

            {/* Instrument Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase">Instrument Specifications</label>
              <div className="grid grid-cols-3 gap-2">
                {(["forex", "gold", "btc"] as const).map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setInstrument(inst)}
                    className={`text-[10px] font-bold py-2 rounded-lg border capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold ${
                      instrument === inst
                        ? "bg-cygnus-gold border-cygnus-gold text-albireo-blue shadow-lg shadow-cygnus-gold/25"
                        : "bg-albireo-blue border-border-custom text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {inst === "btc" ? "Bitcoin" : inst}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Percentage and Stop Loss */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">Risk Percentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPct}
                  onChange={(e) => setRiskPct(Number(e.target.value))}
                  className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs font-bold text-text-primary focus:outline-none focus:border-cygnus-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-muted uppercase">
                  Stop Loss ({instrument === "forex" ? "Pips" : "Points/$"})
                </label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  className="w-full bg-albireo-blue border border-border-custom rounded-lg px-3 py-2 text-xs font-bold text-text-primary focus:outline-none focus:border-cygnus-gold"
                />
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="bg-albireo-blue/45 border border-border-custom/50 rounded-xl p-5 flex flex-col justify-center gap-4 relative overflow-hidden">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-text-muted uppercase">Recommended Lot Size</span>
              <span className="text-3xl font-black text-electric-cyan mt-1">
                {positionSize}{" "}
                <span className="text-xs text-text-muted font-bold tracking-wider">
                  {instrument === "forex" ? "Standard Lots" : instrument === "gold" ? "Ounces/Lots" : "BTC Contracts"}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-border-custom/30 pt-4 text-xs">
              <div>
                <span className="text-text-muted block text-[10px] uppercase">Cash Amount at Risk</span>
                <span className="font-bold text-loss">${riskAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-text-muted block text-[10px] uppercase">Contract Multiplier</span>
                <span className="font-bold text-text-primary">
                  {instrument === "forex" ? "$10 / pip" : instrument === "gold" ? "$100 / pt" : "$1 / pt"}
                </span>
              </div>
            </div>

            <div className="flex gap-2 items-start text-[10px] text-text-muted bg-surface-card/65 p-2 rounded-lg border border-border-custom/50 mt-1">
              <ShieldAlert className="w-4 h-4 text-cygnus-gold shrink-0 mt-0.5" />
              <p>
                Keep risk at or under 1% when trading trailing balance/equity models to prevent sudden account breach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
