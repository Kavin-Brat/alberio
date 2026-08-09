"use client";

import React from "react";
import { QuickDrawdownWidget } from "@/components/dashboard/QuickDrawdownWidget";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SimulatorPreview() {
  return (
    <section id="simulator-desk" className="py-16 font-sora max-w-7xl mx-auto w-full px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Description Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-[11px] font-mono font-bold text-[#00FF00] uppercase tracking-widest block">
            QUANTITATIVE RISK ENGINE
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Test Your Account Survival Rate Instantly.
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            Don't guess if you'll pass. Under Trailing Equity drawdowns, floating profits can shrink your buffer. Adjust risk params below to see your mathematical probability of breaching rules.
          </p>

          <div className="space-y-3 pt-2 text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded bg-[#00FF00]/10 border border-[#00FF00]/40 flex items-center justify-center text-[#00FF00] shrink-0">
                ✓
              </div>
              <span>500 parallel Monte Carlo iterations</span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded bg-[#00FF00]/10 border border-[#00FF00]/40 flex items-center justify-center text-[#00FF00] shrink-0">
                ✓
              </div>
              <span>Models FTMO, Funding Pips & Topstep math</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00FF00] hover:underline uppercase tracking-wider font-mono"
            >
              ACCESS FULL PROFESSIONAL SIMULATOR &rarr;
            </Link>
          </div>
        </div>

        {/* Right Simulator Card Column */}
        <div className="lg:col-span-7 bg-[#0b0b0b] border border-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl">
          <QuickDrawdownWidget />
        </div>
      </div>
    </section>
  );
}
