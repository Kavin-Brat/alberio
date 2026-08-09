"use client";

import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import { Layers, GraduationCap, Calculator, LineChart, Send, Sparkles, Cpu, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

const GROUP_DIVISIONS = [
  {
    num: "1",
    name: "ALBIREO MEDIA",
    icon: LineChart,
    desc: "Free SEO articles, market news, trading guides, and organic discovery funnel.",
    subItems: ["Free Articles", "Market News", "Forex Guides", "SEO Engine"],
    link: "/blog"
  },
  {
    num: "2",
    name: "ALBIREO ACADEMY",
    icon: GraduationCap,
    desc: "Level 1 free introductory masterclass, quizzes, certificates, and level 2/3 paid transformation courses.",
    subItems: ["Free Forex Basics", "Prop Firm Mastery", "Quizzes & Scores", "Certificates"],
    link: "/academy"
  },
  {
    num: "3",
    name: "ALBIREO TOOLS",
    icon: Calculator,
    desc: "Standalone position sizers, Monte Carlo simulators, trade journals, and session volatility tools.",
    subItems: ["Position Sizer", "Prop Guardian", "Monte Carlo Engine", "Trade Journal"],
    link: "/tools"
  },
  {
    num: "4",
    name: "ALBIREO INTELLIGENCE",
    icon: Sparkles,
    desc: "CFTC smart money positioning, macro sentiment modeling, and automated AI research summaries.",
    subItems: ["COT Sentiment", "Macro Models", "AI Research", "Sentiment Index"],
    link: "/tools/cot-analyzer"
  },
  {
    num: "5",
    name: "ALBIREO COMMUNITY",
    icon: Send,
    desc: "Telegram VIP channel, weekly drawdown alerts, educational broadcasts, and trading discussions.",
    subItems: ["Telegram VIP Channel", "Weekly Broadcasts", "Drawdown Alerts", "Discussions"],
    link: "https://t.me/+e5tkgGVt5mIxZjI1"
  },
  {
    num: "6",
    name: "ALBIREO PRO",
    icon: Sparkles,
    desc: "Recurring SaaS subscription tier for serious retail and prop traders.",
    subItems: ["₹299/mo Plan", "Unlimited Monte Carlo", "Historical COT Alerts", "PDF Risk Reports"],
    link: "/pricing"
  },
  {
    num: "7",
    name: "ALBIREO CAPITAL",
    icon: Cpu,
    desc: "Systematic quantitative research, factor risk models, and zero-trust cryptographic track record auditing.",
    subItems: ["Quant Research", "Cryptographic Verifier", "Factor Models", "Audited Sharpe 2.14"],
    link: "/capital"
  },
  {
    num: "8",
    name: "ALBIREO WEALTH",
    icon: Building2,
    desc: "Regulated advisory and capital management desk for high-net-worth portfolio allocations (₹1 Crore+).",
    subItems: ["Regulated Advisory", "HNW Clients", "₹100 Cr Target AUM", "Custody Framework"],
    link: "/wealth"
  }
];

export default function CorporateGroupPage() {
  return (
    <PageContainer>
      {/* HEADER HERO */}
      <GlassCard className="p-8 sm:p-12 border-primary/40 bg-secondary/70 font-sora relative overflow-hidden text-center flex flex-col items-center gap-4">
        <span className="px-3 py-1 rounded bg-primary/20 text-primary border border-primary/40 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,230,0,0.2)]">
          <Layers className="w-4 h-4 text-primary" /> Corporate Ecosystem Map
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
          ALBIREO GROUP ARCHITECTURE
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-light max-w-2xl leading-relaxed">
          The 8 core corporate divisions spanning Media, Academy, SaaS Tools, AI Intelligence, Community, Quant Capital, and Regulated Wealth Management.
        </p>
      </GlassCard>

      {/* 8 DIVISIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sora mt-6">
        {GROUP_DIVISIONS.map((div) => {
          const IconComponent = div.icon;
          return (
            <GlassCard key={div.num} className="flex flex-col justify-between border-border hover:border-primary/40 group p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl border border-primary/20 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground bg-hero-bg px-2.5 py-1 rounded border border-border">
                    #0{div.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {div.name}
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {div.desc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-border/60 text-[11px] text-foreground font-mono">
                  {div.subItems.map((sub, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-primary font-bold">✓</span> {sub}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border mt-4">
                <Link
                  href={div.link}
                  className="text-xs font-bold text-primary hover:text-foreground transition-colors uppercase tracking-widest flex items-center gap-1"
                >
                  Explore Division <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageContainer>
  );
}
