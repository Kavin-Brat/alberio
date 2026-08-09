"use client";

import React, { useState } from "react";
import { Sparkles, Check, Crown, ShieldCheck, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProUpgradeModal from "@/components/ui/ProUpgradeModal";

export default function SubscriptionStatusWidget() {
  const { user, hasEntitlement } = useAuth();
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const isPro = user.subscriptionTier.includes("Pro") || user.role === "SUPER_ADMIN";

  return (
    <>
      <div className="w-full bg-hero-bg border border-primary/40 rounded-xl p-6 font-sora flex flex-col gap-5 shadow-[0_0_30px_rgba(34,230,0,0.1)]">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">ALBIREO PRO SUBSCRIPTION</span>
          </div>
          <span className="px-2.5 py-0.5 rounded bg-profit/20 text-profit font-mono font-bold text-[10px]">
            {isPro ? "STATUS: ACTIVE" : "FREE TIER"}
          </span>
        </div>

        {/* Plan Details */}
        <div className="grid grid-cols-2 gap-4 bg-secondary/50 border border-border p-4 rounded-lg font-mono text-xs">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-sora block">Current Plan</span>
            <span className="font-bold text-foreground">{user.subscriptionTier}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-sora block">Next Renewal Date</span>
            <span className="font-bold text-primary">{user.subscriptionExpiry || "12 Sep 2027"}</span>
          </div>
        </div>

        {/* Benefits Checklist */}
        <div className="space-y-2 border-t border-border pt-4 text-xs font-sora">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
            Your Pro Unlocked Benefits
          </span>
          <div className="flex items-center gap-2 text-foreground">
            <Check className="w-4 h-4 text-profit shrink-0" />
            <span>Advanced Trailing Equity Risk Engine</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Check className="w-4 h-4 text-profit shrink-0" />
            <span>Unlimited Monte Carlo Simulations (5,000+ iterations)</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Check className="w-4 h-4 text-profit shrink-0" />
            <span>AI Market Research Telemetry Summaries</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Check className="w-4 h-4 text-profit shrink-0" />
            <span>Advanced Journal (Sharpe Ratio & Session Analytics)</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Check className="w-4 h-4 text-profit shrink-0" />
            <span>CFTC Historical Extreme Positioning Alerts</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Check className="w-4 h-4 text-profit shrink-0" />
            <span>Premium Masterclass Courses & Digital Templates</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Check className="w-4 h-4 text-profit shrink-0" />
            <span>Downloadable High-Definition Risk Audit PDF Reports</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-border flex justify-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsProModalOpen(true)}
            className="font-bold uppercase tracking-wider text-xs"
          >
            Manage Subscription
          </Button>
        </div>
      </div>

      <ProUpgradeModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </>
  );
}
