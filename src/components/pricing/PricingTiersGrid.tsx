"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingTiersGrid() {
  return (
    <section className="py-8 font-sora max-w-5xl mx-auto w-full">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="px-2.5 py-0.5 rounded bg-[#22e600]/20 text-[#22e600] font-mono text-[10px] font-bold uppercase tracking-wider block w-fit mx-auto mb-2">
          TRANSPARENT MONETIZATION TIERS
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          Choose Your Albireo Operating Tier
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FREE TIER */}
        <GlassCard className="p-8 border-border bg-black/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Albireo Free Visitor</h3>
                <p className="text-xs text-muted-foreground font-light">100% Free Level 1 & 2 Ecosystem</p>
              </div>
              <span className="text-2xl font-extrabold text-white">₹0</span>
            </div>

            <div className="space-y-2 text-xs border-t border-border pt-4 text-muted-foreground">
              <div className="flex items-center gap-2 text-white">
                <Check className="w-4 h-4 text-[#22e600]" /> Basic Position Calculator & Lot Sizer
              </div>
              <div className="flex items-center gap-2 text-white">
                <Check className="w-4 h-4 text-[#22e600]" /> Free Forex Basics Course & Quizzes
              </div>
              <div className="flex items-center gap-2 text-white">
                <Check className="w-4 h-4 text-[#22e600]" /> Trade Journal (50 Trade entries)
              </div>
              <div className="flex items-center gap-2 text-white">
                <Check className="w-4 h-4 text-[#22e600]" /> Basic 100-run Monte Carlo Simulator
              </div>
            </div>
          </div>

          <Link href="/register" className="mt-8">
            <Button variant="outline" size="md" className="w-full font-bold uppercase text-white border-white/20">
              Get Started Free
            </Button>
          </Link>
        </GlassCard>

        {/* PRO TIER */}
        <GlassCard className="p-8 border-[#22e600] bg-black/90 shadow-[0_0_50px_rgba(34,230,0,0.2)] flex flex-col justify-between relative">
          <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#22e600] text-black font-mono text-[10px] font-extrabold uppercase">
            POPULAR PRO TIER
          </span>

          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-[#22e600]" /> Albireo Pro SaaS
                </h3>
                <p className="text-xs text-muted-foreground font-light">Advanced Quantitative Intelligence</p>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-[#22e600]">₹299</span>
                <span className="text-xs text-muted-foreground"> / month</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-border pt-4 text-white">
              <div className="flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-[#22e600]" /> Unlimited 5,000-run Monte Carlo Simulations
              </div>
              <div className="flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-[#22e600]" /> AI Research & Masterclass PDF Exporters
              </div>
              <div className="flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-[#22e600]" /> Unlimited Trade Journal & Performance Analytics
              </div>
              <div className="flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-[#22e600]" /> CFTC Smart Money Historical Extreme Alerts
              </div>
            </div>
          </div>

          <Link href="/register" className="mt-8">
            <Button variant="primary" size="md" className="w-full font-bold uppercase tracking-wider bg-[#22e600] text-black hover:bg-[#22e600]/90">
              Upgrade to Pro &rarr;
            </Button>
          </Link>
        </GlassCard>
      </div>
    </section>
  );
}
