"use client";

import React from "react";
import { Code2, LineChart, Target, GitMerge } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";
import { CORE_ARCHITECTURE_CONTENT } from "@/constants/landingContent";

/**
 * Reusable Core Architecture / Landing Features Component
 */
export default function LandingFeatures() {
  const getIcon = (key: string) => {
    switch (key) {
      case "code": return Code2;
      case "chart": return LineChart;
      case "target": return Target;
      default: return GitMerge;
    }
  };

  return (
    <section className="py-16 font-sora max-w-6xl mx-auto w-full px-4 sm:px-8">
      <SectionHeader
        categoryPill={CORE_ARCHITECTURE_CONTENT.pillCategory}
        headline={CORE_ARCHITECTURE_CONTENT.headline}
        description={CORE_ARCHITECTURE_CONTENT.description}
        className="mb-12"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CORE_ARCHITECTURE_CONTENT.cards.map((card, i) => {
          const IconComp = getIcon(card.iconKey);
          return (
            <Link key={i} href={card.href} className="block group">
              <div className="p-6 bg-[#0b0b0b] border border-slate-800/80 hover:border-[#00FF00]/40 transition-all rounded-xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#00FF00]/10 border border-[#00FF00]/30 flex items-center justify-center text-[#00FF00] mb-4 group-hover:bg-[#00FF00] group-hover:text-black transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF00] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
