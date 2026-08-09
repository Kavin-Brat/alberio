"use client";

import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import { OUR_STORY_CONTENT } from "@/constants/landingContent";

/**
 * Reusable Our Story / Origin Story Component
 */
export default function LandingStory() {
  return (
    <section className="py-16 font-sora max-w-6xl mx-auto w-full px-4 sm:px-8">
      <SectionHeader
        categoryPill={OUR_STORY_CONTENT.pillCategory}
        headline={OUR_STORY_CONTENT.headline}
        description={OUR_STORY_CONTENT.description}
        className="mb-12"
      />

      {/* Main Origin Story Box */}
      <div className="p-8 bg-[#0b0b0b] border border-[#00FF00]/40 rounded-xl mb-8">
        <span className="text-[10px] font-mono font-bold text-[#00FF00] uppercase tracking-widest block mb-2">
          {OUR_STORY_CONTENT.originBox.pill}
        </span>
        <h3 className="text-xl font-bold text-white mb-3">
          {OUR_STORY_CONTENT.originBox.title}
        </h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          {OUR_STORY_CONTENT.originBox.body}
        </p>
      </div>

      {/* 3 Phase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OUR_STORY_CONTENT.phases.map((phase, i) => (
          <div key={i} className="p-6 bg-[#0b0b0b] border border-slate-800 rounded-xl">
            <span className="text-[10px] font-mono font-bold text-[#00FF00] uppercase tracking-widest block mb-2">
              {phase.pill}
            </span>
            <h4 className="text-sm font-bold text-white mb-2">{phase.title}</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
