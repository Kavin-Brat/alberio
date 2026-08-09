"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PRO_FEATURES_COMPARISON, STARTER_PACK_ITEMS } from "@/data/productsData";
import { Check, X, Sparkles, Download, ShieldCheck, HelpCircle, ArrowRight, Send, Layers, Building2 } from "lucide-react";
import Link from "next/link";
import ProUpgradeModal from "@/components/ui/ProUpgradeModal";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer>
      {/* HEADER HERO */}
      <div className="flex flex-col items-center text-center gap-4 font-sora py-6">
        <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,230,0,0.2)]">
          <Sparkles className="w-3.5 h-3.5" /> Albireo Monetization Ecosystem
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl leading-tight">
          Invest in Your Risk Engine, Not Random Advice.
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl font-light leading-relaxed">
          Upgrade to <strong className="text-primary font-semibold">Albireo Pro</strong> for recurring drawdown surveillance, Monte Carlo iterations, and institutional intelligence. Or grab our instant <strong className="text-foreground font-semibold">Digital Starter Pack</strong>.
        </p>

        {/* BILLING TOGGLE */}
        <div className="flex items-center justify-center gap-3 mt-6 p-1.5 bg-secondary border border-border rounded-lg">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly Billing (₹299/mo)
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              billingCycle === "yearly"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly Billing (₹2,499/yr)
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-foreground text-background font-black uppercase">
              Save 30%
            </span>
          </button>
        </div>
      </div>

      {/* PRICING CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sora items-stretch">
        {/* FREE TIER */}
        <GlassCard className="flex flex-col justify-between border-border relative">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">Free Intelligence</h3>
                <p className="text-xs text-muted-foreground font-light mt-1">For casual traders testing tools</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-secondary text-xs font-bold text-muted-foreground">₹0</span>
            </div>

            <div className="text-3xl font-black text-foreground mb-6">
              ₹0 <span className="text-xs font-normal text-muted-foreground">/ forever</span>
            </div>

            <div className="space-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>1 Drawdown Simulation / session</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Basic 500 Monte Carlo Iterations</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Weekly CFTC COT Sentiment View</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Trade Journal (Cap 50 trades/mo)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/50 line-through">
                <X className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                <span>Trailing Equity Peak Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/50 line-through">
                <X className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                <span>Downloadable PDF Risk Reports</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Link href="/tools">
              <Button variant="outline" className="w-full">
                Use Free Tools
              </Button>
            </Link>
          </div>
        </GlassCard>

        {/* PRO SUBSCRIPTION (FEATURED) */}
        <GlassCard className="flex flex-col justify-between border-primary/50 bg-secondary/60 relative shadow-[0_0_30px_rgba(34,230,0,0.15)]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-md">
            Most Popular SaaS Subscription
          </div>

          <div>
            <div className="flex justify-between items-start mb-4 mt-2">
              <div>
                <h3 className="text-xl font-bold text-foreground">Albireo Pro</h3>
                <p className="text-xs text-muted-foreground font-light mt-1">Unlimited quantitative risk intelligence</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-primary/20 text-primary text-xs font-bold uppercase">Pro</span>
            </div>

            <div className="text-4xl font-black text-foreground mb-1">
              {billingCycle === "yearly" ? "₹2,499" : "₹299"}
              <span className="text-xs font-normal text-muted-foreground">
                {billingCycle === "yearly" ? " / year (₹208/mo)" : " / month"}
              </span>
            </div>
            <p className="text-[11px] text-primary font-medium mb-6">
              {billingCycle === "yearly" ? "Billed annually. Save ₹1,089 relative to monthly!" : "Billed monthly. Cancel anytime."}
            </p>

            <div className="space-y-3 border-t border-border pt-6 text-xs text-foreground font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Unlimited Monte Carlo Stress Tests</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Trailing Equity vs Balance Simulation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Unlimited Monthly Trade Journal Logs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Sharpe Ratio & Session Volatility Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Extreme Positioning COT Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Downloadable PDF Risk Audit Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>VIP Telegram Drawdown Intelligence Channel</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Button
              variant="primary"
              className="w-full font-bold shadow-[0_0_20px_rgba(34,230,0,0.3)]"
              onClick={() => setIsModalOpen(true)}
            >
              Get Albireo Pro Access
            </Button>
          </div>
        </GlassCard>

        {/* DIGITAL STARTER PACK (ONE-TIME PURCHASE) */}
        <GlassCard id="starter-pack" className="flex flex-col justify-between border-border relative">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">Digital Starter Pack</h3>
                <p className="text-xs text-muted-foreground font-light mt-1">One-time template download</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-secondary text-xs font-bold text-profit">1-Time</span>
            </div>

            <div className="text-3xl font-black text-foreground mb-1">
              ₹299 <span className="text-xs font-normal text-muted-foreground">/ one-time payment</span>
            </div>
            <p className="text-[11px] text-muted-foreground font-light mb-6">Lifetime download of all templates & calculators</p>

            <div className="space-y-3 border-t border-border pt-6 text-xs text-foreground">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-profit shrink-0" />
                <span>Forex Math & Pip Cheat Sheet</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-profit shrink-0" />
                <span>Position Sizing Excel & Google Sheet</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-profit shrink-0" />
                <span>Prop Firm Evaluation Risk Planner</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-profit shrink-0" />
                <span>Trading Journal Notion Template</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-profit shrink-0" />
                <span>Pre-Market Risk Management Checklist</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Button variant="secondary" className="w-full font-bold">
              Download Starter Pack (₹299)
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* FEATURE MATRIX COMPARISON TABLE */}
      <div className="mt-16 font-sora">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-foreground">Detailed Feature Matrix</h2>
          <p className="text-xs text-muted-foreground mt-1">Compare Free vs Albireo Pro capabilities side by side</p>
        </div>

        <GlassCard className="p-0 overflow-x-auto border-border">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/80">
                <th className="p-4 font-bold text-foreground">Feature</th>
                <th className="p-4 font-bold text-muted-foreground text-center">Free Tier</th>
                <th className="p-4 font-bold text-primary text-center">Albireo Pro (₹299/mo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PRO_FEATURES_COMPARISON.map((feat, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-foreground font-medium">{feat.text}</td>
                  <td className="p-4 text-center">
                    {feat.free ? (
                      <Check className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {feat.pro ? (
                      <Check className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>

      {/* B2B ENTERPRISE SECTION */}
      <GlassCard className="mt-16 p-8 border-primary/30 bg-secondary/40 font-sora">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <span className="px-3 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest w-fit flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> B2B & Prop Firm Enterprise Analytics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Operating a Prop Firm or Trading Desk?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              We engineer custom prop-firm risk dashboards, real-time trader exposure alerts, drawdown compliance API engines, and institutional risk auditing modules for businesses.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3 items-stretch lg:items-end">
            <span className="text-xs text-primary font-mono font-bold">₹25,000 – ₹1,00,000+ / mo</span>
            <a
              href="https://t.me/+e5tkgGVt5mIxZjI1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="primary" className="w-full font-bold flex items-center gap-2">
                Inquire Enterprise Integration <Send className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </GlassCard>

      {/* PRO MODAL TRIGGER */}
      <ProUpgradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageContainer>
  );
}
