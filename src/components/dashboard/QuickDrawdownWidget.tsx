"use client";

import { useState, useEffect } from "react";
import { Calculator, AlertTriangle, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/Card";

export default function QuickDrawdownWidget() {
  const [balance, setBalance] = useState<number>(50000);
  const [drawdownType, setDrawdownType] = useState<"static" | "trailing-balance" | "trailing-equity">("trailing-equity");
  const [maxDrawdownPct, setMaxDrawdownPct] = useState<number>(10);
  const [winRate, setWinRate] = useState<number>(50);
  const [riskReward, setRiskReward] = useState<number>(2.0);
  const [riskPerTradePct, setRiskPerTradePct] = useState<number>(1.0);

  const [survivalRate, setSurvivalRate] = useState<number>(100);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const runSimulation = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      const numTrials = 500;
      const numTrades = 30;
      let survivors = 0;
      
      const maxDrawdownAmt = balance * (maxDrawdownPct / 100);
      const riskAmt = balance * (riskPerTradePct / 100);

      for (let trial = 0; trial < numTrials; trial++) {
        let currentBalance = balance;
        let peakBalance = balance;
        let peakEquity = balance;
        let hasBreached = false;

        for (let trade = 0; trade < numTrades; trade++) {
          const isWin = Math.random() * 100 < winRate;
          const pnl = isWin ? riskAmt * riskReward : -riskAmt;
          
          currentBalance += pnl;

          if (currentBalance > peakBalance) {
            peakBalance = currentBalance;
          }

          let limit = 0;
          if (drawdownType === "static") {
            limit = balance - maxDrawdownAmt;
          } else if (drawdownType === "trailing-balance") {
            limit = peakBalance - maxDrawdownAmt;
          } else {
            const floatingPeakMultiplier = isWin ? 1.2 : 1.0;
            const simulatedPeakEquity = currentBalance - pnl + (isWin ? pnl * floatingPeakMultiplier : 0);
            if (simulatedPeakEquity > peakEquity) {
              peakEquity = simulatedPeakEquity;
            }
            limit = peakEquity - maxDrawdownAmt;
          }

          if (currentBalance <= limit) {
            hasBreached = true;
            break;
          }
        }

        if (!hasBreached) {
          survivors++;
        }
      }

      setSurvivalRate(Math.round((survivors / numTrials) * 100));
      setIsSimulating(false);
    }, 400);
  };

  useEffect(() => {
    runSimulation();
  }, [balance, drawdownType, maxDrawdownPct, winRate, riskReward, riskPerTradePct]);

  const getSurvivalColor = (rate: number) => {
    if (rate >= 85) return "text-profit border-profit/40 bg-profit/10";
    if (rate >= 60) return "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10";
    return "text-loss border-loss/40 bg-loss/10";
  };

  return (
    <div className="w-full relative overflow-hidden font-heading text-white">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-cyber-cyan/15 pb-4">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-cyber-cyan" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-white">
              Quick Drawdown Survival Simulator
            </h3>
          </div>
          <span className="text-[10px] font-bold text-cyber-cyan bg-cyber-cyan/15 px-2.5 py-1 rounded-xs border border-cyber-cyan/25">
            Monte Carlo Engine
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-light-purple font-medium">Starting Account Size</label>
                <span className="text-white font-bold">${balance.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full h-1.5 bg-primary-dark rounded-xs appearance-none cursor-pointer accent-cyber-cyan"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-light-purple font-medium">Drawdown Evaluation Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["static", "trailing-balance", "trailing-equity"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDrawdownType(type)}
                    className={`text-[10px] md:text-xs py-2 px-1 rounded-xs border font-bold capitalize transition-all cursor-pointer ${
                      drawdownType === type
                        ? "bg-cyber-cyan text-primary-dark border-cyber-cyan shadow-[0_0_10px_rgba(102,252,241,0.4)]"
                        : "bg-primary-dark text-light-purple border-cyber-cyan/20 hover:text-white"
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
                  <label className="text-light-purple font-medium">Max Drawdown</label>
                  <span className="text-white font-bold">{maxDrawdownPct}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={maxDrawdownPct}
                  onChange={(e) => setMaxDrawdownPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-primary-dark rounded-xs appearance-none cursor-pointer accent-electric-cyan"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-light-purple font-medium">Risk Per Trade</label>
                  <span className="text-white font-bold">{riskPerTradePct}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={riskPerTradePct}
                  onChange={(e) => setRiskPerTradePct(Number(e.target.value))}
                  className="w-full h-1.5 bg-primary-dark rounded-xs appearance-none cursor-pointer accent-electric-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-light-purple font-medium">Win Rate</label>
                  <span className="text-white font-bold">{winRate}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="80"
                  step="5"
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-primary-dark rounded-xs appearance-none cursor-pointer accent-cyber-cyan"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-light-purple font-medium">R:R Ratio</label>
                  <span className="text-white font-bold">1:{riskReward}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={riskReward}
                  onChange={(e) => setRiskReward(Number(e.target.value))}
                  className="w-full h-1.5 bg-primary-dark rounded-xs appearance-none cursor-pointer accent-cyber-cyan"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-primary-dark/80 border border-cyber-cyan/15 rounded-sm p-6 relative">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-light-purple font-bold">
                Survival Probability
              </span>

              <div className={`mt-4 w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center font-bold text-3xl transition-all duration-300 ${getSurvivalColor(survivalRate)}`}>
                {isSimulating ? (
                  <div className="w-8 h-8 border-2 border-t-transparent border-cyber-cyan rounded-full animate-spin"></div>
                ) : (
                  <>
                    {survivalRate}%
                    <span className="text-[10px] font-bold text-light-purple uppercase tracking-widest mt-1">
                      {survivalRate >= 85 ? "Safe" : survivalRate >= 60 ? "Warning" : "High Risk"}
                    </span>
                  </>
                )}
              </div>

              <div className="mt-6 flex gap-2 items-start text-xs text-light-purple font-sans leading-relaxed">
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
