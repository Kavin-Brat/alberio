"use client";

import React, { useState } from "react";
import { X, Sparkles, Bot, FileText, Send, CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface AIResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetSymbol?: string;
}

export default function AIResearchModal({
  isOpen,
  onClose,
  assetSymbol = "EUR/USD"
}: AIResearchModalProps) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateReport = () => {
    setLoading(true);
    setReport(null);
    setTimeout(() => {
      setReport(
        `ALBIREO AI QUANT RESEARCH SUMMARY — ${assetSymbol}\n` +
        `Date: August 9, 2026 | Institutional Confidence Index: 84/100\n\n` +
        `1. CFTC COT POSITIONING:\n` +
        `- Commercial Hedgers net position: -184,200 contracts (Heavy Resistance Zone).\n` +
        `- Non-Commercial Speculators net long position: +214,000 contracts (92nd Percentile Extreme).\n\n` +
        `2. MARKET STRUCTURE & VOLATILITY:\n` +
        `- London Open Volatility ATR: 48 pips | New York Overlap: 65 pips.\n` +
        `- Key Liquidity Pools identified at 1.0820 (Asian Lows) and 1.0940 (Weekly Resistance).\n\n` +
        `3. PROBABILITY & RISK ADVISORY:\n` +
        `- Recommended Lot Sizing Cap: 1.2 Lots per $100k account.\n` +
        `- Maximum Tail Drawdown Risk under Trailing Equity rules: 2.1%.`
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sora">
      <div className="relative w-full max-w-2xl bg-hero-bg border border-primary/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,230,0,0.2)] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Level 4 Albireo Pro AI Intelligence
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
          AI Quant Research & Market Telemetry
        </h2>
        <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">
          Automated CFTC smart money positioning, macro fundamental outlook, and institutional risk modeling.
        </p>

        {/* Action / Output Box */}
        <div className="my-6">
          {!report && !loading && (
            <div className="p-8 bg-secondary/40 border border-border rounded-xl flex flex-col items-center text-center gap-4">
              <Bot className="w-12 h-12 text-primary" />
              <div>
                <h3 className="text-base font-bold text-foreground">Generate AI Market Intelligence for {assetSymbol}</h3>
                <p className="text-xs text-muted-foreground max-w-sm font-light mt-1">
                  Synthesize weekly CFTC COT futures reports, session ATR profiles, and Monte Carlo drawdown risks into a single report.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleGenerateReport}
                className="font-bold flex items-center gap-2 uppercase tracking-wider"
              >
                Generate Report <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          )}

          {loading && (
            <div className="p-12 bg-secondary/40 border border-border rounded-xl flex flex-col items-center text-center gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-primary font-bold">Synthesizing CFTC Data & Monte Carlo Engine...</span>
            </div>
          )}

          {report && !loading && (
            <div className="p-4 bg-hero-bg border border-primary/40 rounded-xl font-mono text-xs text-foreground whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto">
              {report}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          {report && (
            <a href="https://t.me/+e5tkgGVt5mIxZjI1" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="font-bold flex items-center gap-1.5">
                Discuss Report on Telegram <Send className="w-3.5 h-3.5" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
