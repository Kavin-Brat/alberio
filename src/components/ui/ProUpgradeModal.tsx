"use client";

import React, { useState } from "react";
import { X, Check, ShieldCheck, Zap, Sparkles, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle?: string;
}

export default function ProUpgradeModal({
  isOpen,
  onClose,
  featureTitle = "Albireo Pro"
}: ProUpgradeModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  if (!isOpen) return null;

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

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Unlock {featureTitle}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Supercharge Your Risk Engine with <span className="text-primary">Albireo Pro</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-light leading-relaxed">
          Get unlimited Monte Carlo simulations, historical COT sentiment alerts, unlimited trade journal entries, and PDF risk reports.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 my-6 p-1.5 bg-secondary/80 rounded-lg border border-border w-fit mx-auto">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              billingCycle === "monthly"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly (₹299/mo)
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === "yearly"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly (₹2,499/yr)
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-foreground text-background font-black uppercase">
              Save 30%
            </span>
          </button>
        </div>

        {/* Pro Benefits List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 text-xs text-foreground">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/20 text-primary"><Check className="w-3.5 h-3.5" /></div>
            <span>Unlimited Monte Carlo Stress Tests</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/20 text-primary"><Check className="w-3.5 h-3.5" /></div>
            <span>Trailing Equity vs Balance Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/20 text-primary"><Check className="w-3.5 h-3.5" /></div>
            <span>Unlimited Monthly Trade Journal Logs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/20 text-primary"><Check className="w-3.5 h-3.5" /></div>
            <span>Sharpe Ratio & Session Volatility Analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/20 text-primary"><Check className="w-3.5 h-3.5" /></div>
            <span>Historical CFTC COT Extreme Positioning Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/20 text-primary"><Check className="w-3.5 h-3.5" /></div>
            <span>Downloadable PDF Risk Audit Reports</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Link href="/pricing" className="flex-1">
            <Button variant="primary" size="md" className="w-full font-bold">
              Upgrade to Pro Now ({billingCycle === "yearly" ? "₹2,499/Year" : "₹299/Month"})
            </Button>
          </Link>
          <a
            href="https://t.me/+e5tkgGVt5mIxZjI1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-sm text-xs font-semibold text-primary hover:bg-primary/10 transition-colors uppercase tracking-wider"
          >
            Ask On Telegram <Send className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
