"use client";

import { useState, useEffect } from "react";
import { Calculator, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

export default function QuickDrawdownWidget() {
  const [balance, setBalance] = useState<number>(50000);
  const [drawdownType, setDrawdownType] = useState<"static" | "trailing-balance" | "trailing-equity">("trailing-equity");
  const [maxDrawdownPct, setMaxDrawdownPct] = useState<number>(10);
  const [winRate, setWinRate] = useState<number>(50);
  const [riskReward, setRiskReward] = useState<number>(2.0); // 1:2
  const [riskPerTradePct, setRiskPerTradePct] = useState<number>(1.0); // 1%

  const [survivalRate, setSurvivalRate] = useState<number>(100);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Run a quick Monte Carlo Simulation
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
        let peakEquity = balance; // In custom rule models, we track floating equity peaks
        let hasBreached = false;

        for (let trade = 0; trade < numTrades; trade++) {
          const isWin = Math.random() * 100 < winRate;
          const pnl = isWin ? riskAmt * riskReward : -riskAmt;
          
          currentBalance += pnl;

          if (currentBalance > peakBalance) {
            peakBalance = currentBalance;
          }

          // Trailing drawdown thresholds
          let limit = 0;
          if (drawdownType === "static") {
            limit = balance - maxDrawdownAmt;
          } else if (drawdownType === "trailing-balance") {
            limit = peakBalance - maxDrawdownAmt;
          } else { // trailing-equity (including floating profits)
            // Under trailing equity, if we have floating profit, the threshold moves up immediately
            // Even if the trade isn't closed, peak equity is hit.
            // We simulate this by adjusting the peak equity higher than final closed balance occasionally
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

  // Color logic for survival rate
  const getSurvivalColor = (rate: number) => {
    if (rate >= 85) return "text-profit border-profit/30 bg-profit/5";
    if (rate >= 60) return "text-cygnus-gold border-cygnus-gold/30 bg-cygnus-gold/5";
    return "text-loss border-loss/30 bg-loss/5";
  };

  return (
    <div className="w-full bg-surface-card border border-border-custom rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Visual background glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-electric-cyan/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-custom/50 pb-4">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-cygnus-gold" />
            <h3 className="font-bold text-base text-text-primary uppercase tracking-wide">
              Quick Drawdown Survival Simulator
            </h3>
          </div>
          <span className="text-xs font-semibold text-electric-cyan bg-electric-cyan/10 px-2.5 py-1 rounded-full border border-electric-cyan/20">
            30-Trade Monte Carlo
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs Section */}
          <div className="flex flex-col gap-4">
            {/* Starting Balance */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs">
                <label className="text-text-muted font-medium">Starting Account Size</label>
                <span className="text-text-primary font-bold">${balance.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full h-1.5 bg-albireo-blue rounded-lg appearance-none cursor-pointer accent-cygnus-gold"
              />
            </div>

            {/* Drawdown Type Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-text-muted font-medium">Drawdown Evaluation Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["static", "trailing-balance", "trailing-equity"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDrawdownType(type)}
                    className={`text-[10px] md:text-xs py-2 px-1 rounded-lg border font-semibold capitalize transition-all duration-200 ${
                      drawdownType === type
                        ? "bg-cygnus-gold text-albireo-blue border-cygnus-gold shadow-lg shadow-cygnus-gold/25"
                        : "bg-albireo-blue/50 text-text-muted border-border-custom hover:bg-albireo-blue hover:text-text-primary"
                    }`}
                  >
                    {type.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Drawdown & Risk per Trade */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Max Drawdown</label>
                  <span className="text-text-primary font-bold">{maxDrawdownPct}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={maxDrawdownPct}
                  onChange={(e) => setMaxDrawdownPct(Number(e.target.value))}
                  className="w-full h-1.5 bg-albireo-blue rounded-lg appearance-none cursor-pointer accent-electric-cyan"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Risk Per Trade</label>
                  <span className="text-text-primary font-bold">{riskPerTradePct}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={riskPerTradePct}
                  onChange={(e) => setRiskPerTradePct(Number(e.target.value))}
                  className="w-full h-1.5 bg-albireo-blue rounded-lg appearance-none cursor-pointer accent-electric-cyan"
                />
              </div>
            </div>

            {/* Win Rate & Risk-to-Reward */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Win Rate</label>
                  <span className="text-text-primary font-bold">{winRate}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="80"
                  step="5"
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-albireo-blue rounded-lg appearance-none cursor-pointer accent-cygnus-gold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Risk-to-Reward (R:R)</label>
                  <span className="text-text-primary font-bold">1:{riskReward}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={riskReward}
                  onChange={(e) => setRiskReward(Number(e.target.value))}
                  className="w-full h-1.5 bg-albireo-blue rounded-lg appearance-none cursor-pointer accent-cygnus-gold"
                />
              </div>
            </div>
          </div>

          {/* Outputs / Gauge Section */}
          <div className="flex flex-col items-center justify-center bg-albireo-blue/30 border border-border-custom/50 rounded-xl p-6 relative">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-text-muted font-bold">
                Account Survival Probability
              </span>

              {/* Dynamic survival meter */}
              <div className={`mt-4 w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center font-extrabold text-3xl transition-all duration-300 ${getSurvivalColor(survivalRate)}`}>
                {isSimulating ? (
                  <div className="w-8 h-8 border-4 border-t-transparent border-cygnus-gold rounded-full animate-spin"></div>
                ) : (
                  <>
                    {survivalRate}%
                    <span className="text-[10px] font-bold text-text-muted/80 uppercase tracking-widest mt-1">
                      {survivalRate >= 85 ? "Safe" : survivalRate >= 60 ? "Warning" : "High Risk"}
                    </span>
                  </>
                )}
              </div>

              {/* Insights and warnings */}
              <div className="mt-6 flex gap-2 items-start text-xs text-text-muted">
                {survivalRate >= 85 ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-profit shrink-0 mt-0.5" />
                    <p>
                      Excellent parameters. Your drawdown buffer is robust enough to survive statistical losing streaks under these rules.
                    </p>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-loss shrink-0 mt-0.5" />
                    <p>
                      {drawdownType === "trailing-equity"
                        ? "Trailing Equity rules drag your buffer up on open trade profits. Close positions or reduce trade risk to avoid trailing liquidation."
                        : "High probability of breach during normal distribution drawdowns. Consider lowering risk per trade to under 1%."}
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
