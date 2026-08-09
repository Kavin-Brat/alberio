"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import { ArrowDown, Check, ShieldCheck, Sparkles, TrendingUp, Cpu, Building2, Layers, Award } from "lucide-react";

export default function FunnelMachine() {
  const FUNNEL_STEPS = [
    { title: "GOOGLE / YOUTUBE / SOCIAL", desc: "Organic search & educational discovery", tag: "TRAFFIC" },
    { title: "FREE CONTENT (LEVEL 1)", desc: "Free calculators, articles, COT & Forex Basics", tag: "LEVEL 1" },
    { title: "FREE USER REGISTRATION (LEVEL 2)", desc: "Create account to save journal & quiz scores", tag: "LEVEL 2" },
    { title: "USER DASHBOARD & ENGAGEMENT (LEVEL 3)", desc: "Persona selector: Beginner, Trader, Prop, Investor", tag: "LEVEL 3" },
    { title: "ALBIREO PRO SAAS (LEVEL 4)", desc: "₹299/mo: Unlimited Monte Carlo, AI Research, PDF Reports", tag: "LEVEL 4" },
    { title: "PROFESSIONAL & APIS (LEVEL 5)", desc: "REST APIs, raw data export, risk compliance desk", tag: "LEVEL 5" },
    { title: "CRYPTOGRAPHIC TRACK RECORD & QUANT", desc: "Zero-trust trade verifier & audited Sharpe 2.14", tag: "QUANT" },
    { title: "ALBIREO WEALTH MANAGEMENT (LEVEL 6)", desc: "Regulated HNW advisory: ₹1 Crore+ portfolio accounts", tag: "AUM" }
  ];

  const PHASES = [
    { num: 1, name: "FOUNDATION", pct: 100, status: "COMPLETED", items: ["Website", "Branding", "Tools", "Auth Engine", "Admin OS"] },
    { num: 2, name: "EDUCATION", pct: 65, status: "IN_PROGRESS", items: ["100+ Lessons", "Quizzes", "Certificates", "Learning Cockpit"] },
    { num: 3, name: "PRO SAAS", pct: 40, status: "IN_PROGRESS", items: ["₹299/mo Plan", "Advanced Risk Engine", "AI Research", "PDF Audit"] },
    { num: 4, name: "INTELLIGENCE", pct: 20, status: "PLANNED", items: ["CFTC Feed", "Macro Models", "Proprietary Sentiment"] },
    { num: 5, name: "QUANT LAB", pct: 10, status: "PLANNED", items: ["Backtesting Engine", "Factor Models", "Portfolio Optimization"] },
    { num: 6, name: "CAPITAL & WEALTH", pct: 5, status: "PLANNED", items: ["Cryptographic Verifier", "Regulated Advisory", "₹100 Cr AUM"] }
  ];

  const MOAT_STAGES = [
    { years: "Years 1–2", title: "Content Moat", desc: "Organic SEO & educational authority" },
    { years: "Years 2–4", title: "Product Moat", desc: "Monte Carlo & risk calculator workflow" },
    { years: "Years 3–5", title: "Data Moat", desc: "Aggregated CFTC sentiment & market telemetry" },
    { years: "Years 4–6", title: "AI + Research Moat", desc: "Proprietary macro & risk algorithms" },
    { years: "Years 5–8", title: "Track Record Moat", desc: "Cryptographic zero-trust verification" },
    { years: "Years 7–10", title: "Capital + Trust Moat", desc: "Regulated wealth advisory & AUM" }
  ];

  return (
    <div className="flex flex-col gap-8 font-sora">
      {/* 1. THE ENTIRE FUNNEL MACHINE (POINT 19) */}
      <GlassCard className="p-6 border-profit/40 bg-secondary/60 flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-profit" />
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider">
              1. The Complete Albireo Funnel Machine (Point 19)
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-profit">TRAFFIC → AUM CONVERSION</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          {FUNNEL_STEPS.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="w-full max-w-xl p-3 bg-hero-bg border border-border rounded-lg flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="font-bold text-foreground block font-sora text-xs">{step.title}</span>
                  <span className="text-[10px] text-muted-foreground">{step.desc}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-bold text-[9px] uppercase shrink-0 ml-2">
                  {step.tag}
                </span>
              </div>
              {idx < FUNNEL_STEPS.length - 1 && (
                <ArrowDown className="w-4 h-4 text-primary shrink-0 animate-bounce" />
              )}
            </React.Fragment>
          ))}
        </div>
      </GlassCard>

      {/* 2. 6-PHASE PRODUCT ROADMAP PROGRESS (POINT 24) */}
      <GlassCard className="p-6 border-border flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider">
              2. 6-Phase Product Roadmap Progress (Point 24)
            </h2>
          </div>
          <span className="text-xs font-mono text-primary font-bold">EXECUTION STATUS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PHASES.map((p) => (
            <div key={p.num} className="p-4 bg-hero-bg border border-border rounded-xl flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="font-sora font-bold text-foreground">PHASE 0{p.num}: {p.name}</span>
                <span className="font-bold text-profit">{p.pct}%</span>
              </div>
              <div className="text-profit font-bold text-xs">
                {"█".repeat(Math.round(p.pct / 10)) + "░".repeat(10 - Math.round(p.pct / 10))}
              </div>
              <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                {p.items.map((it, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                    ✓ {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 3. MOAT EVOLUTION TIMELINE (POINT 22) */}
      <GlassCard className="p-6 border-border flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-profit" />
            <h2 className="text-base font-bold text-foreground uppercase tracking-wider">
              3. Strategic Moat Evolution Timeline (Point 22)
            </h2>
          </div>
          <span className="text-xs font-mono text-profit">DEFENSIBILITY ROADMAP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {MOAT_STAGES.map((m, idx) => (
            <div key={idx} className="p-3 bg-hero-bg border border-border rounded-lg flex flex-col gap-1">
              <span className="text-[10px] font-mono text-primary font-bold uppercase">{m.years}</span>
              <span className="font-bold text-foreground">{m.title}</span>
              <span className="text-[10px] text-muted-foreground font-light leading-snug">{m.desc}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
