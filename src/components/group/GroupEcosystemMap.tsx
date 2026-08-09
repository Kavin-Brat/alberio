"use client";

import React from "react";
import { GlassCard } from "@/components/ui/Card";
import { Layers, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function GroupEcosystemMap() {
  const DIVISIONS = [
    { title: "1. Albireo Media", desc: "SEO Forex research, macro news & technical guides.", href: "/blog" },
    { title: "2. Albireo Academy", desc: "Structured progress-based learning with printable certificates.", href: "/academy" },
    { title: "3. Albireo Tools", desc: "Monte Carlo drawdown simulator & CFTC COT sentiment engine.", href: "/tools" },
    { title: "4. Albireo Intelligence", desc: "Institutional smart money flow & market sentiment alerts.", href: "/tools/cot-analyzer" },
    { title: "5. Albireo Community", desc: "Telegram VIP community & institutional trader discussions.", href: "https://t.me/+e5tkgGVt5mIxZjI1" },
    { title: "6. Albireo Pro SaaS", desc: "Paid subscription tier offering unlimited simulations & AI research.", href: "/pricing" },
    { title: "7. Albireo Capital", desc: "Zero-trust cryptographic trade execution verification.", href: "/capital" },
    { title: "8. Albireo Wealth", desc: "HNW portfolio advisory targeting ₹100 Crore AUM.", href: "/wealth" }
  ];

  return (
    <GlassCard className="p-8 border-border font-sora">
      <div className="flex items-center gap-2 mb-6">
        <Layers className="w-5 h-5 text-[#22e600]" />
        <h2 className="text-xl font-extrabold text-white">Albireo Group Corporate Ecosystem Hub (8 Divisions)</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {DIVISIONS.map((d, i) => (
          <div key={i} className="p-4 bg-[#0b0b0b] border border-border rounded-xl flex flex-col justify-between space-y-2 hover:border-[#22e600]/40 transition-colors">
            <div>
              <h3 className="font-bold text-white text-sm mb-1">{d.title}</h3>
              <p className="text-[11px] text-muted-foreground font-light">{d.desc}</p>
            </div>

            <Link href={d.href} className="text-[10px] font-bold text-[#22e600] flex items-center gap-1 hover:underline pt-2">
              Explore Division &rarr;
            </Link>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
