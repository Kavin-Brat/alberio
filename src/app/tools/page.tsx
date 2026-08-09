"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ComplianceEngine, ComplianceReport } from "@/services/complianceEngine";
import { MonteCarloEngine, MonteCarloResult } from "@/services/monteCarloEngine";
import { SessionVolatilityEngine, SessionAnalysisReport } from "@/services/sessionVolatilityEngine";
import { CorrelationEngine, CorrelationMatrixReport } from "@/services/correlationEngine";
import { ShieldCheck, Activity, BarChart3, GitCompare, Play, FileText, CheckCircle2, AlertTriangle, Layers, Calculator, Sparkles, Download, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import PositionSizerWidget from "@/components/dashboard/PositionSizerWidget";
import ProUpgradeModal from "@/components/ui/ProUpgradeModal";

export default function ToolsSuitePage() {
  const [activeTab, setActiveTab] = useState<"POSITION_SIZER" | "COMPLIANCE" | "MONTE_CARLO" | "SESSIONS" | "CORRELATION">("POSITION_SIZER");
  const [isProModalOpen, setIsProModalOpen] = useState(false);

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

  // Static Reports
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Quantitative Software Suite
            </span>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-1">
              Institutional Risk & Calculation Suite
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1">
              Zero-dependency lot sizers, prop-firm guardians, Monte Carlo stress-testers & session volatility tools.
            </p>
          </div>

          <Button
            variant="cyber"
            size="sm"
            onClick={() => setIsProModalOpen(true)}
            className="shrink-0 font-bold"
          >
            Unlock Albireo Pro Tools
          </Button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("POSITION_SIZER")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "POSITION_SIZER" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Calculator className="w-4 h-4" /> 1. Lot & Risk Calculator
          </button>
          <button
            onClick={() => setActiveTab("COMPLIANCE")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "COMPLIANCE" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <ShieldCheck className="w-4 h-4" /> 2. Prop Guardian
          </button>
          <button
            onClick={() => setActiveTab("MONTE_CARLO")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "MONTE_CARLO" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Activity className="w-4 h-4" /> 3. Monte Carlo Simulator
          </button>
          <button
            onClick={() => setActiveTab("SESSIONS")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "SESSIONS" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <BarChart3 className="w-4 h-4" /> 4. Volatility Matrix
          </button>
          <button
            onClick={() => setActiveTab("CORRELATION")}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer",
              activeTab === "CORRELATION" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.4)]" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <GitCompare className="w-4 h-4" /> 5. Asset Correlation
          </button>
        </div>
      </div>

      {/* TAB 1: POSITION SIZER & RISK CALCULATOR */}
      {activeTab === "POSITION_SIZER" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
          <div className="lg:col-span-7">
            <GlassCard className="p-6 border-border">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Precision Position Sizing Engine
              </h3>
              <p className="text-xs text-muted-foreground mb-6 font-light">
                Calculate exact lot sizes and dollar risk based on your account currency, stop loss pips, and risk percentage cap.
              </p>
              <PositionSizerWidget />
            </GlassCard>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <GlassCard className="p-6 border-primary/30 bg-secondary/40 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Lock className="w-4 h-4" /> Albireo Pro PDF Risk Reports
              </div>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Need to submit custom risk reports to your prop firm desk or trading journal? Albireo Pro allows you to export high-definition PDF risk breakdown cards.
              </p>
              <Button
                variant="primary"
                size="sm"
                className="font-bold w-fit"
                onClick={() => setIsProModalOpen(true)}
              >
                Unlock PDF Reports (₹299/mo)
              </Button>
            </GlassCard>
          </div>
        </div>
      )}

      {/* TAB 2: PROP-FIRM GUARDIAN */}
      {activeTab === "COMPLIANCE" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <GlassCard className="flex flex-col gap-4 border-border">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  MT4 / MT5 Trade Log CSV Input
                </span>
              </div>
              <textarea
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                className="w-full h-56 bg-hero-bg border border-border rounded-md p-3 font-mono text-[11px] text-foreground focus:outline-hidden focus:border-primary transition-all resize-none"
              />
              <Button
                variant="primary"
                onClick={handleRunCompliance}
                className="flex items-center justify-center gap-2 font-bold text-xs uppercase"
              >
                <Play className="w-4 h-4" /> Audit CSV Logs
              </Button>
            </GlassCard>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <GlassCard className="flex flex-col gap-4 border-border">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Compliance Audit Results
                </span>
                <span className={cn(
                  "px-2.5 py-0.5 rounded text-[10px] font-bold uppercase",
                  complianceReport.complianceStatus === "PASSED" ? "bg-profit/20 text-profit" : "bg-destructive/20 text-destructive"
                )}>
                  {complianceReport.complianceStatus === "PASSED" ? "PASSED COMPLIANCE" : "RULE BREACH DETECTED"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-hero-bg border border-border rounded">
                  <span className="text-[10px] text-muted-foreground block">Max Daily Drawdown</span>
                  <span className="font-mono font-bold text-foreground">{complianceReport.maxDailyLoss.percent.toFixed(2)}%</span>
                </div>
                <div className="p-3 bg-hero-bg border border-border rounded">
                  <span className="text-[10px] text-muted-foreground block">Max Overall Drawdown</span>
                  <span className="font-mono font-bold text-foreground">{complianceReport.maxTrailingDrawdown.percent.toFixed(2)}%</span>
                </div>
                <div className="p-3 bg-hero-bg border border-border rounded">
                  <span className="text-[10px] text-muted-foreground block">Top Trade Share %</span>
                  <span className="font-mono font-bold text-foreground">{complianceReport.consistencyScore.topTradeSharePercent.toFixed(2)}%</span>
                </div>
                <div className="p-3 bg-hero-bg border border-border rounded">
                  <span className="text-[10px] text-muted-foreground block">30% Consistency</span>
                  <span className={cn("font-mono font-bold", complianceReport.consistencyScore.passed ? "text-profit" : "text-destructive")}>
                    {complianceReport.consistencyScore.passed ? "COMPLIANT" : "VIOLATED"}
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* TAB 3: MONTE CARLO STRESS-TESTER */}
      {activeTab === "MONTE_CARLO" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sora">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <GlassCard className="flex flex-col gap-4 border-border">
              <span className="text-xs font-bold text-foreground uppercase border-b border-border pb-3">
                Historical Return Sequence (%)
              </span>
              <input
                type="text"
                value={returnsInput}
                onChange={(e) => setReturnsInput(e.target.value)}
                className="w-full bg-hero-bg border border-border rounded p-3 font-mono text-xs text-foreground focus:border-primary focus:outline-hidden"
              />
              <Button
                variant="primary"
                onClick={handleRunMonteCarlo}
                className="flex items-center justify-center gap-2 font-bold text-xs uppercase"
              >
                <Activity className="w-4 h-4" /> Run 1,000 Iterations
              </Button>
            </GlassCard>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <GlassCard className="flex flex-col gap-4 border-border">
              <span className="text-xs font-bold text-foreground uppercase border-b border-border pb-3">
                Monte Carlo Probability Distribution
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 bg-hero-bg border border-border rounded">
                  <span className="text-[10px] text-muted-foreground block font-sora">Median Ending Equity</span>
                  <span className="font-bold text-profit">${monteCarloResult.medianEndingEquity.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-hero-bg border border-border rounded">
                  <span className="text-[10px] text-muted-foreground block font-sora">5th Percentile Drawdown</span>
                  <span className="font-bold text-destructive">-${monteCarloResult.fifthPercentileDrawdown.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-hero-bg border border-border rounded">
                  <span className="text-[10px] text-muted-foreground block font-sora">Probability of Ruin</span>
                  <span className="font-bold text-foreground">{monteCarloResult.probabilityOfRuinPercent.toFixed(1)}%</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* TAB 4: SESSIONS */}
      {activeTab === "SESSIONS" && (
        <GlassCard className="p-6 border-border font-sora">
          <h3 className="text-lg font-bold text-foreground mb-4">EUR/USD UTC Session Volatility Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-hero-bg border border-border rounded">
              <span className="text-primary font-bold block mb-1">Tokyo (00:00 - 08:00 UTC)</span>
              <p className="text-muted-foreground">Average ATR: 18 pips | Breakout Continuation: 32%</p>
            </div>
            <div className="p-4 bg-hero-bg border border-border rounded">
              <span className="text-primary font-bold block mb-1">London (08:00 - 16:00 UTC)</span>
              <p className="text-muted-foreground">Average ATR: 45 pips | Breakout Continuation: 68%</p>
            </div>
            <div className="p-4 bg-hero-bg border border-border rounded">
              <span className="text-primary font-bold block mb-1">New York Overlap (13:00 - 16:00 UTC)</span>
              <p className="text-muted-foreground">Average ATR: 62 pips | Breakout Continuation: 74%</p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* TAB 5: CORRELATION */}
      {activeTab === "CORRELATION" && (
        <GlassCard className="p-6 border-border font-sora">
          <h3 className="text-lg font-bold text-foreground mb-4">Cross-Asset Pearson Correlation Coefficient</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="p-3 text-foreground">Asset</th>
                  <th className="p-3 text-foreground">EUR/USD</th>
                  <th className="p-3 text-foreground">GBP/USD</th>
                  <th className="p-3 text-foreground">USD/JPY</th>
                  <th className="p-3 text-foreground">Gold (XAU)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 font-bold text-primary">EUR/USD</td>
                  <td className="p-3 text-profit">+1.00</td>
                  <td className="p-3 text-profit">+0.88</td>
                  <td className="p-3 text-destructive">-0.72</td>
                  <td className="p-3 text-profit">+0.45</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-primary">GBP/USD</td>
                  <td className="p-3 text-profit">+0.88</td>
                  <td className="p-3 text-profit">+1.00</td>
                  <td className="p-3 text-destructive">-0.65</td>
                  <td className="p-3 text-profit">+0.38</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-primary">USD/JPY</td>
                  <td className="p-3 text-destructive">-0.72</td>
                  <td className="p-3 text-destructive">-0.65</td>
                  <td className="p-3 text-profit">+1.00</td>
                  <td className="p-3 text-destructive">-0.55</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* PRO MODAL */}
      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </PageContainer>
  );
}
