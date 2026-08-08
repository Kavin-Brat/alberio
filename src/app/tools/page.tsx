"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ComplianceEngine, ComplianceReport } from "@/services/complianceEngine";
import { MonteCarloEngine, MonteCarloResult } from "@/services/monteCarloEngine";
import { SessionVolatilityEngine, SessionAnalysisReport } from "@/services/sessionVolatilityEngine";
import { CorrelationEngine, CorrelationMatrixReport } from "@/services/correlationEngine";
import { ShieldCheck, Activity, BarChart3, GitCompare, Play, FileText, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ToolsSuitePage() {
  const [activeTab, setActiveTab] = useState<"COMPLIANCE" | "MONTE_CARLO" | "SESSIONS" | "CORRELATION">("COMPLIANCE");

  // State 1: Compliance Guardian
  const [csvInput, setCsvInput] = useState<string>(
`Ticket,Open Time,Type,Size,Item,Price,S/L,T/P,Close Time,Price,Commission,Swap,Profit
TRD-101,2026-08-01 08:30,BUY,1.0,EUR/USD,1.0850,1.0820,1.0910,2026-08-01 12:45,1.0900,-3.50,0.00,500.00
TRD-102,2026-08-02 14:00,SELL,2.0,GBP/USD,1.2650,1.2690,1.2580,2026-08-02 17:30,1.2590,-7.00,-1.20,1200.00
TRD-103,2026-08-03 09:15,BUY,1.5,USD/JPY,154.20,153.80,155.00,2026-08-03 11:20,153.80,-5.25,0.00,-600.00
TRD-104,2026-08-04 15:30,BUY,3.0,XAU/USD,2420.0,2410.0,2440.0,2026-08-04 19:00,2410.0,-10.50,-4.50,-3000.00`
  );
  const [complianceReport, setComplianceReport] = useState<ComplianceReport>(
    ComplianceEngine.analyzeTradeCSV(csvInput)
  );

  // State 2: Monte Carlo Tester
  const [returnsInput, setReturnsInput] = useState<string>("+1.5, -0.8, +2.1, -1.2, +3.0, -0.5, +1.8, -1.5, +2.4, -0.9, +4.2, -2.1");
  const [monteCarloResult, setMonteCarloResult] = useState<MonteCarloResult>(
    MonteCarloEngine.runSimulation([1.5, -0.8, 2.1, -1.2, 3.0, -0.5, 1.8, -1.5, 2.4, -0.9, 4.2, -2.1])
  );

  // State 3 & 4: Static Reports
  const sessionReport: SessionAnalysisReport = SessionVolatilityEngine.analyzeSessions("EUR/USD");
  const correlationReport: CorrelationMatrixReport = CorrelationEngine.calculateCorrelationMatrix();

  const handleRunCompliance = () => {
    setComplianceReport(ComplianceEngine.analyzeTradeCSV(csvInput));
  };

  const handleRunMonteCarlo = () => {
    const parsedReturns = returnsInput
      .split(",")
      .map((val) => parseFloat(val.trim()))
      .filter((num) => !isNaN(num));
    setMonteCarloResult(MonteCarloEngine.runSimulation(parsedReturns));
  };

  return (
    <PageContainer>
      {/* Title & Navigation Tabs */}
      <div className="flex flex-col gap-4 font-sora">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Quantitative Software Suite
          </span>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            Institutional Algorithmic Tools
          </h1>
          <p className="text-sm text-muted-foreground font-light">
            Zero-dependency risk guardians, Monte Carlo stress-testers, session volatility matrix & cross-asset correlation engines.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("COMPLIANCE")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "COMPLIANCE" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <ShieldCheck className="w-4 h-4" /> 1. Prop-Firm Guardian
          </button>
          <button
            onClick={() => setActiveTab("MONTE_CARLO")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "MONTE_CARLO" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Activity className="w-4 h-4" /> 2. Monte Carlo Stress-Tester
          </button>
          <button
            onClick={() => setActiveTab("SESSIONS")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "SESSIONS" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <BarChart3 className="w-4 h-4" /> 3. Session Volatility Matrix
          </button>
          <button
            onClick={() => setActiveTab("CORRELATION")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "CORRELATION" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <GitCompare className="w-4 h-4" /> 4. Cross-Asset Correlation
          </button>
        </div>
      </div>

      {/* TAB 1: PROP-FIRM RULE COMPLIANCE GUARDIAN */}
      {activeTab === "COMPLIANCE" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
          {/* CSV Input Form */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <GlassCard>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Trade History CSV Input
              </h3>
              <p className="text-xs text-muted-foreground mb-3 font-light">
                Paste raw MT4/MT5/cTrader trade log rows to analyze High Water Marks, daily loss limits (5%), and consistency rule compliance.
              </p>
              <textarea
                rows={10}
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                className="w-full bg-hero-bg border border-border rounded-md p-3 text-xs font-mono text-foreground focus:outline-hidden focus:border-primary"
              />
              <Button onClick={handleRunCompliance} variant="primary" size="md" className="w-full mt-4 flex items-center justify-center gap-2">
                <Play className="w-4 h-4" /> Run Compliance Audit
              </Button>
            </GlassCard>
          </div>

          {/* Audit Report Results */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <GlassCard className={cn("border-2", complianceReport.complianceStatus === "PASSED" ? "border-profit/40" : "border-loss/40")}>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Compliance Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("text-2xl font-extrabold uppercase tracking-tight", complianceReport.complianceStatus === "PASSED" ? "text-profit" : "text-loss")}>
                      {complianceReport.complianceStatus}
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-muted-foreground">Trades Parsed:</span>
                  <div className="font-bold text-foreground">{complianceReport.parsedTradesCount}</div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-xs font-mono">
                <div className="p-3 bg-hero-bg border border-border rounded-md">
                  <span className="text-[10px] text-muted-foreground font-sans uppercase">High Water Mark</span>
                  <div className="font-bold text-foreground text-sm mt-1">${complianceReport.highWaterMark.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-hero-bg border border-border rounded-md">
                  <span className="text-[10px] text-muted-foreground font-sans uppercase">Max Daily Loss</span>
                  <div className={cn("font-bold text-sm mt-1", complianceReport.maxDailyLoss.percent > 5 ? "text-loss" : "text-foreground")}>
                    ${complianceReport.maxDailyLoss.dollar} ({complianceReport.maxDailyLoss.percent}%)
                  </div>
                </div>
                <div className="p-3 bg-hero-bg border border-border rounded-md">
                  <span className="text-[10px] text-muted-foreground font-sans uppercase">Trailing Drawdown</span>
                  <div className={cn("font-bold text-sm mt-1", complianceReport.maxTrailingDrawdown.percent > 10 ? "text-loss" : "text-foreground")}>
                    ${complianceReport.maxTrailingDrawdown.dollar} ({complianceReport.maxTrailingDrawdown.percent}%)
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">Actionable Recommendations</span>
                <ul className="space-y-2">
                  {complianceReport.actionableRecommendations.map((rec, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2 bg-hero-bg p-2.5 rounded-md border border-border">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* TAB 2: MONTE CARLO STRATEGY STRESS-TESTER */}
      {activeTab === "MONTE_CARLO" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <GlassCard>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Returns Sequence Input
              </h3>
              <p className="text-xs text-muted-foreground mb-3 font-light">
                Comma-separated historical trade return percentages (+1.5, -0.8, +2.1, -1.2, ...).
              </p>
              <textarea
                rows={4}
                value={returnsInput}
                onChange={(e) => setReturnsInput(e.target.value)}
                className="w-full bg-hero-bg border border-border rounded-md p-3 text-xs font-mono text-foreground focus:outline-hidden focus:border-primary"
              />
              <Button onClick={handleRunMonteCarlo} variant="primary" size="md" className="w-full mt-4 flex items-center justify-center gap-2">
                <Play className="w-4 h-4" /> Run 1,000 Resample Iterations
              </Button>
            </GlassCard>

            <GlassCard className="flex flex-col gap-3 font-mono text-xs">
              <span className="text-xs font-bold font-sora uppercase text-primary">Simulation Statistics</span>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Total Iterations:</span>
                <span className="font-bold text-foreground">{monteCarloResult.totalSimulations}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Median Ending Equity:</span>
                <span className="font-bold text-profit">${monteCarloResult.medianEndingEquity.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Worst 5th Percentile Drawdown:</span>
                <span className="font-bold text-loss">{monteCarloResult.fifthPercentileDrawdown}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Probability of Ruin (20% DD):</span>
                <span className={cn("font-bold text-sm", monteCarloResult.probabilityOfRuinPercent > 15 ? "text-loss" : "text-primary")}>
                  {monteCarloResult.probabilityOfRuinPercent}%
                </span>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <GlassCard>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                Monte Carlo Equity Paths (Median vs 5th Percentile Tail Risk)
              </h3>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monteCarloResult.equityCurves}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="tradeIndex" stroke="hsl(0 0% 40%)" fontSize={10} />
                    <YAxis stroke="hsl(0 0% 40%)" fontSize={10} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ backgroundColor: '#0d0e12', borderColor: '#333', color: '#fff', fontSize: '11px' }} />
                    <Line type="monotone" dataKey="median" stroke="#57F287" strokeWidth={2} name="Median Path" dot={false} />
                    <Line type="monotone" dataKey="worst5th" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" name="5th Percentile Worst Case" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-4 p-3 bg-hero-bg rounded-md border border-border font-light">
                {monteCarloResult.riskExplanation}
              </p>
            </GlassCard>
          </div>
        </div>
      )}

      {/* TAB 3: SESSION-BASED VOLATILITY MATRIX */}
      {activeTab === "SESSIONS" && (
        <div className="flex flex-col gap-6 font-sora">
          <GlassCard>
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Microstructure Matrix</span>
                <h3 className="text-xl font-extrabold text-foreground mt-1">EUR/USD Global Session Volatility & Liquidity</h3>
              </div>
              <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-md border border-primary/20">
                Prime Window: {sessionReport.primeExecutionWindow}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sessionReport.sessions.map((sess, idx) => (
                <div key={idx} className="p-4 bg-hero-bg border border-border rounded-lg flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{sess.sessionName}</span>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-xs border border-border">
                      {sess.utcHours}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 font-mono text-xs py-2 border-y border-border/40">
                    <div>
                      <span className="text-[9px] text-muted-foreground font-sans uppercase">Avg ATR</span>
                      <div className="font-bold text-primary">{sess.averageAtrPips} pips</div>
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground font-sans uppercase">Avg Volume</span>
                      <div className="font-bold text-foreground">{sess.averageVolume.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-[9px] text-muted-foreground font-sans uppercase">Breakout Rate</span>
                      <div className="font-bold text-profit">{sess.breakoutContinuationRatePercent}%</div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground font-light">
                    Strategy Fit: <strong className="text-foreground">{sess.optimalStrategy}</strong>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* TAB 4: CROSS-ASSET CORRELATION MATRIX */}
      {activeTab === "CORRELATION" && (
        <div className="flex flex-col gap-6 font-sora">
          <GlassCard>
            <div className="border-b border-border pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Quantitative Macro Engine</span>
              <h3 className="text-xl font-extrabold text-foreground mt-1">Cross-Asset Pearson Correlation Matrix</h3>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-center text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border bg-hero-bg text-muted-foreground font-bold">
                    <th className="p-3 text-left">Asset</th>
                    {correlationReport.assets.map((a, i) => (
                      <th key={i} className="p-3">{a}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {correlationReport.assets.map((assetRow, r) => (
                    <tr key={r} className="hover:bg-muted/20">
                      <td className="p-3 font-bold text-left text-foreground font-sora">{assetRow}</td>
                      {correlationReport.matrix[r].map((val, c) => (
                        <td key={c} className="p-3">
                          <span className={cn(
                            "px-2 py-1 rounded-md font-bold text-xs inline-block min-w-[50px]",
                            val === 1.0 ? "bg-muted/30 text-muted-foreground" : val < -0.5 ? "bg-loss/20 text-loss border border-loss/30" : val > 0.5 ? "bg-profit/20 text-profit border border-profit/30" : "bg-hero-bg text-foreground"
                          )}>
                            {val.toFixed(2)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Decoupling Signals */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">Macro Structural Signals</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {correlationReport.decouplingPairs.map((pair, idx) => (
                  <div key={idx} className="p-3 bg-hero-bg border border-border rounded-md flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-foreground">{pair.assetA} vs {pair.assetB}</span>
                      <span className={cn("px-2 py-0.5 rounded-xs text-[10px] uppercase font-mono", pair.status === "DECOUPLING_WARNING" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-primary/10 text-primary")}>
                        r = {pair.correlation}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-light text-[11px] leading-relaxed">
                      {pair.insight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </PageContainer>
  );
}
