"use client";

import React, { useState, useEffect } from "react";
import { Calculator, ShieldAlert, CheckCircle, AlertTriangle, Edit2, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";

export function QuickDrawdownWidget() {
  const [balance, setBalance] = useState<number>(100000);
  const [isEditingBalance, setIsEditingBalance] = useState<boolean>(false);
  const [drawdownType, setDrawdownType] = useState<"static" | "trailing-balance" | "trailing-equity">("trailing-equity");
  const [maxDrawdownPct, setMaxDrawdownPct] = useState<number>(10);
  const [winRate, setWinRate] = useState<number>(50);
  const [riskReward, setRiskReward] = useState<number>(1.5);
  const [riskPerTradePct, setRiskPerTradePct] = useState<number>(1);

  const [survivalRate, setSurvivalRate] = useState<number>(85);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      let failCount = 0;
      const numSimulations = 200;
      const numTrades = 50;

      for (let s = 0; s < numSimulations; s++) {
        let currentBalance = balance;
        let highWaterMark = balance;

        for (let t = 0; t < numTrades; t++) {
          const isWin = Math.random() * 100 < winRate;
          const riskAmount = currentBalance * (riskPerTradePct / 100);

          if (isWin) {
            currentBalance += riskAmount * riskReward;
            if (currentBalance > highWaterMark) {
              highWaterMark = currentBalance;
            }
          } else {
            currentBalance -= riskAmount;
          }

          let currentDrawdownLimit = 0;
          if (drawdownType === "static") {
            currentDrawdownLimit = balance * (1 - maxDrawdownPct / 100);
          } else {
            currentDrawdownLimit = highWaterMark * (1 - maxDrawdownPct / 100);
          }

          if (currentBalance <= currentDrawdownLimit) {
            failCount++;
            break;
          }
        }
      }

      const calculatedSurvival = Math.round(((numSimulations - failCount) / numSimulations) * 100);
      setSurvivalRate(calculatedSurvival);
      setIsSimulating(false);
    }, 150);
  };

  useEffect(() => {
    runSimulation();
  }, [balance, drawdownType, maxDrawdownPct, winRate, riskReward, riskPerTradePct]);

  const getSurvivalColor = (rate: number) => {
    if (rate >= 85) return "text-profit border-profit/40 bg-profit/10";
    if (rate >= 60) return "text-primary border-primary/40 bg-primary/10";
    return "text-loss border-loss/40 bg-loss/10";
  };

  return (
    <div className="w-full relative overflow-hidden font-sora text-foreground">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              Quick Drawdown Survival Simulator
            </h3>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-xs border border-primary/30">
            Monte Carlo Engine
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs min-h-[28px]">
                <label className="text-muted-foreground font-medium">Starting Account Size</label>
                
                {isEditingBalance ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground font-mono">$</span>
                    <input
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(Math.max(1, Number(e.target.value)))}
                      onBlur={() => setIsEditingBalance(false)}
                      onKeyDown={(e) => e.key === "Enter" && setIsEditingBalance(false)}
                      autoFocus
                      className="w-28 bg-hero-bg border border-primary text-foreground font-bold font-mono px-2 py-0.5 rounded-xs text-xs focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setIsEditingBalance(false)}
                      className="text-primary hover:text-foreground text-[10px] uppercase font-bold p-1 rounded-xs bg-primary/10 border border-primary/30 cursor-pointer transition-colors"
                      title="Save Account Size"
                    >
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-bold font-mono text-sm">${balance.toLocaleString()}</span>
                    <button
                      type="button"
                      onClick={() => setIsEditingBalance(true)}
                      className="p-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer border border-border/60 hover:border-primary/50 bg-secondary/50 rounded-xs"
                      title="Edit Custom Account Size"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <input
                type="range"
                min="100"
                max="200000"
                step="500"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium">Drawdown Evaluation Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["static", "trailing-balance", "trailing-equity"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDrawdownType(type)}
                    className={`text-[10px] md:text-xs py-2 px-1 rounded-xs border font-bold capitalize transition-all cursor-pointer ${
                      drawdownType === type
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(34,230,0,0.4)]"
                        : "bg-hero-bg text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {type.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-muted-foreground font-medium">Max Drawdown</label>
                  <span className="text-foreground font-bold font-mono">{maxDrawdownPct}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={maxDrawdownPct}
                  onChange={(e) => setMaxDrawdownPct(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-muted-foreground font-medium">Risk Per Trade</label>
                  <span className="text-foreground font-bold font-mono">{riskPerTradePct}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={riskPerTradePct}
                  onChange={(e) => setRiskPerTradePct(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-muted-foreground font-medium">Win Rate</label>
                  <span className="text-foreground font-bold font-mono">{winRate}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="80"
                  step="5"
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-muted-foreground font-medium">R:R Ratio</label>
                  <span className="text-foreground font-bold font-mono">1:{riskReward}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={riskReward}
                  onChange={(e) => setRiskReward(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-hero-bg/80 border border-border rounded-sm p-6 relative">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                Survival Probability
              </span>

              <div className={`mt-4 w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center font-bold text-3xl font-mono transition-all duration-300 ${getSurvivalColor(survivalRate)}`}>
                {isSimulating ? (
                  <div className="w-8 h-8 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
                ) : (
                  <>
                    {survivalRate}%
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 font-sora">
                      {survivalRate >= 85 ? "Safe" : survivalRate >= 60 ? "Warning" : "High Risk"}
                    </span>
                  </>
                )}
              </div>

              <div className="mt-6 flex gap-2 items-start text-xs text-muted-foreground font-sora leading-relaxed">
                {survivalRate >= 85 ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-profit shrink-0 mt-0.5" />
                    <p>
                      Robust parameters. Buffer is strong enough to handle normal statistical losing streaks.
                    </p>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-loss shrink-0 mt-0.5" />
                    <p>
                      {drawdownType === "trailing-equity"
                        ? "Trailing Equity rules drag buffer up on open trade profits."
                        : "High probability of breach. Reduce risk per trade to under 1%."}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickDrawdownWidget;
