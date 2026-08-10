"use client";

import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Cpu, Calculator, ShieldCheck, Activity, BarChart3, LineChart, Layers, ArrowRight } from "lucide-react";

/**
 * Dedicated Tools Module - Quantitative Software Suite Page Component
 * Inspired by devportal_frontend_2.0 & topsweb page architecture
 */
export default function ToolsSuitePage() {
  const TOOLS = [
    {
      title: "CFTC COT Institutional Position Analyzer",
      desc: "Institutional Commitment of Traders sentiment tracker for Commercials vs Non-Commercial spec funds.",
      href: "/tools/cot-analyzer",
      icon: LineChart,
      tag: "INSTITUTIONAL",
    },
    {
      title: "Monte Carlo Bootstrap Resampling Engine",
      desc: "1,000-iteration probability of ruin and maximum drawdown stress simulator.",
      href: "/dashboard",
      icon: Cpu,
      tag: "PRO RISK ENGINE",
    },
    {
      title: "Prop-Firm Compliance Guardian Audit",
      desc: "CSV trade log parser for High Water Marks, 5% daily loss, and 30% consistency rule checks.",
      href: "/journal",
      icon: ShieldCheck,
      tag: "AUDIT PARSER",
    },
  ];

  return (
    <ProtectedRoute>
      <PageContainer>
        <div className="space-y-6 font-sora">
          <div>
            <span className="text-xs font-mono font-bold text-[#00FF00] uppercase tracking-wider block">
              QUANTITATIVE SOFTWARE SUITE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Institutional Tools & Calculators
            </h1>
            <p className="text-xs text-slate-400 font-light mt-1">
              Select a quantitative engine below to run institutional analysis and drawdown stress-tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOOLS.map((t) => (
              <GlassCard key={t.title} className="p-6 border-slate-800 bg-[#0b0b0b] flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00FF00]/10 border border-[#00FF00]/30 flex items-center justify-center text-[#00FF00]">
                    <t.icon className="w-5 h-5 text-[#00FF00]" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#00FF00] uppercase tracking-wider block">
                    {t.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">{t.title}</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{t.desc}</p>
                </div>

                <Link href={t.href}>
                  <Button variant="primary" size="sm" className="w-full font-bold uppercase bg-[#00FF00] text-black flex items-center justify-center gap-1.5">
                    Launch Tool <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
