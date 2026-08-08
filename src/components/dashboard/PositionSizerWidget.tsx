"use client";

import { useState, useEffect } from "react";
import { Calculator, ShieldAlert } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";

type InstrumentType = "forex" | "gold" | "btc";

export default function PositionSizerWidget() {
  const [balance, setBalance] = useState<number>(100000);
  const [riskPct, setRiskPct] = useState<number>(1);
  const [stopLoss, setStopLoss] = useState<number>(20);
  const [instrument, setInstrument] = useState<InstrumentType>("forex");

  const [riskAmount, setRiskAmount] = useState<number>(1000);
  const [positionSize, setPositionSize] = useState<number>(5.0);

  useEffect(() => {
    const usdRisk = balance * (riskPct / 100);
    setRiskAmount(usdRisk);

    let size = 0;
    if (instrument === "forex") {
      size = usdRisk / (stopLoss * 10);
    } else if (instrument === "gold") {
      size = usdRisk / (stopLoss * 100);
    } else if (instrument === "btc") {
      size = usdRisk / stopLoss;
    }

    setPositionSize(parseFloat(size.toFixed(2)));
  }, [balance, riskPct, stopLoss, instrument]);

  return (
    <GlassCard id="position-sizer" className="w-full my-8 scroll-mt-24">
      <div className="flex flex-col gap-5 font-heading">
        <div className="flex items-center justify-between border-b border-cyber-cyan/15 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-cyber-cyan" />
            <span className="font-bold text-xs uppercase tracking-wider text-white">
              Position Sizer Engine
            </span>
          </div>
          <span className="text-[10px] text-cyber-cyan font-bold bg-cyber-cyan/15 border border-cyber-cyan/30 px-2 py-0.5 rounded-xs">
            Live Math
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-light-purple uppercase">Account Balance ($)</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs font-bold text-white focus:outline-hidden focus:border-cyber-cyan"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-light-purple uppercase">Instrument Specs</label>
              <div className="grid grid-cols-3 gap-2">
                {(["forex", "gold", "btc"] as const).map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setInstrument(inst)}
                    className={`text-[10px] font-bold py-2 rounded-sm border capitalize cursor-pointer transition-all ${
                      instrument === inst
                        ? "bg-cyber-cyan border-cyber-cyan text-primary-dark shadow-[0_0_10px_rgba(102,252,241,0.4)]"
                        : "bg-primary-dark border-cyber-cyan/20 text-light-purple hover:text-white"
                    }`}
                  >
                    {inst === "btc" ? "Bitcoin" : inst}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-light-purple uppercase">Risk Percentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPct}
                  onChange={(e) => setRiskPct(Number(e.target.value))}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs font-bold text-white focus:outline-hidden focus:border-cyber-cyan"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-light-purple uppercase">
                  Stop Loss ({instrument === "forex" ? "Pips" : "Pts/$"})
                </label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  className="w-full bg-primary-dark border border-cyber-cyan/20 rounded-sm px-3 py-2 text-xs font-bold text-white focus:outline-hidden focus:border-cyber-cyan"
                />
              </div>
            </div>
          </div>

          <div className="bg-primary-dark/80 border border-cyber-cyan/15 rounded-sm p-5 flex flex-col justify-center gap-4 relative">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-light-purple uppercase">Recommended Size</span>
              <span className="text-3xl font-bold text-cyber-cyan text-glow-cyan mt-1">
                {positionSize}{" "}
                <span className="text-xs text-light-purple font-bold tracking-wider">
                  {instrument === "forex" ? "Lots" : instrument === "gold" ? "Ounces" : "Contracts"}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-cyber-cyan/10 pt-4 text-xs">
              <div>
                <span className="text-light-purple block text-[10px] uppercase">Cash at Risk</span>
                <span className="font-bold text-loss">${riskAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-light-purple block text-[10px] uppercase">Multiplier</span>
                <span className="font-bold text-white">
                  {instrument === "forex" ? "$10 / pip" : instrument === "gold" ? "$100 / pt" : "$1 / pt"}
                </span>
              </div>
            </div>

            <div className="flex gap-2 items-start text-[10px] text-light-purple bg-secondary-dark p-2 rounded-sm border border-cyber-cyan/15 font-sans">
              <ShieldAlert className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
              <p>
                Maintain risk at ≤ 1% when trading trailing balance models to prevent breaches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
