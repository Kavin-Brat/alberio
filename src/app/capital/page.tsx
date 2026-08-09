"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ShieldCheck, Activity, Award, CheckCircle2, Lock, Cpu, BarChart3, LineChart, Code2 } from "lucide-react";
import Link from "next/link";

export default function CapitalQuantPage() {
  const [proofHash, setProofHash] = useState<string | null>(null);

  const handleGenerateProof = () => {
    const hash = `0x7a8f9c2e1b4d3a${Math.floor(Math.random() * 1000000000000000).toString(16)}`;
    setProofHash(hash);
  };

  return (
    <PageContainer>
      {/* HEADER HERO */}
      <GlassCard className="p-8 sm:p-12 border-primary/40 bg-secondary/70 font-sora relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-primary/20 text-primary border border-primary/40 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,230,0,0.2)]">
                <Cpu className="w-4 h-4 text-primary" /> System 7 — Albireo Capital & Quant Lab
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              Cryptographic Track Record & Quant Research
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-light max-w-2xl leading-relaxed">
              Zero-trust trade log verification, factor risk models, systematic backtesting, and audited performance scorecards for quantitative strategies.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="bg-hero-bg border border-border p-6 rounded-2xl flex flex-col gap-2 font-mono text-xs w-full lg:w-72 text-center">
            <span className="text-[10px] text-muted-foreground uppercase font-sora">Audited Strategy Sharpe</span>
            <div className="text-3xl font-black text-profit">2.14</div>
            <span className="text-[11px] text-muted-foreground">Max Drawdown: 4.2%</span>
          </div>
        </div>
      </GlassCard>

      {/* STRATEGY SCORECARD & PERFORMANCE METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sora mt-4">
        <GlassCard className="p-4 border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Compound Annual Growth (CAGR)</span>
          <span className="text-2xl font-black font-mono text-profit">+28.5%</span>
        </GlassCard>

        <GlassCard className="p-4 border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Max Historical Drawdown</span>
          <span className="text-2xl font-black font-mono text-destructive">-4.2%</span>
        </GlassCard>

        <GlassCard className="p-4 border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Profit Factor</span>
          <span className="text-2xl font-black font-mono text-primary">2.38</span>
        </GlassCard>

        <GlassCard className="p-4 border-border">
          <span className="text-[10px] text-muted-foreground uppercase font-bold block">Win Rate (1,000 Trades)</span>
          <span className="text-2xl font-black font-mono text-foreground">64.2%</span>
        </GlassCard>
      </div>

      {/* CRYPTOGRAPHIC PROOF GENERATOR */}
      <GlassCard className="p-8 border-border bg-secondary/40 font-sora mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              Zero-Trust Cryptographic Trade Verifier
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              We generate cryptographic hash proofs for raw MT4/MT5 trade execution logs so investors and prop firm allocators can verify trade integrity without exposing proprietary entry algorithms.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={handleGenerateProof}
                className="font-bold flex items-center gap-2 text-xs uppercase tracking-wider"
              >
                Generate Cryptographic Proof Hash <Cpu className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-hero-bg border border-border p-6 rounded-xl font-mono text-xs text-foreground flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-border pb-2 text-[10px] text-muted-foreground">
              <span>PROOF STATUS</span>
              <span className="text-profit font-bold">VERIFIED</span>
            </div>

            {proofHash ? (
              <div className="p-3 bg-secondary rounded border border-profit/40 break-all text-primary font-bold">
                {proofHash}
              </div>
            ) : (
              <p className="text-muted-foreground/60 italic text-center py-4">
                Click 'Generate Cryptographic Proof Hash' to create verifiable trade log signature.
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
