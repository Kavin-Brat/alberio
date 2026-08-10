"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { FOREX_COURSE } from "@/data/learnData";

/**
 * Clean & Simple Learn Platform Preview Component for Home / Landing Page
 * Exclusively displays the "Forex Foundations" introductory free course
 * matching the exact beginner level data from learnData.ts.
 */
export default function LearnPreview() {
  const beginnerLevel = FOREX_COURSE.levels[0]; // Beginner / Forex Foundations level

  return (
    <section className="py-12 font-sora max-w-6xl mx-auto w-full px-4 sm:px-8">
      <div className="p-8 sm:p-10 rounded-2xl bg-[#0b0b0b] border border-[#00FF00]/40 shadow-2xl space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#00FF00] uppercase tracking-widest block">
                EDUCATION HUB
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00FF00]/10 border border-[#00FF00]/30 text-[10px] font-mono font-bold text-[#00FF00] uppercase">
                100% Free Course
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Forex Foundations — Free Introductory Course
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
              {beginnerLevel.description}
            </p>
          </div>

          <Link href="/learn/forex" className="shrink-0">
            <button
              type="button"
              className="px-6 py-3 rounded text-xs font-bold uppercase tracking-wider bg-[#00FF00] text-black hover:bg-[#00FF00]/90 transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,0,0.3)]"
            >
              Start Free Forex Course <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Forex Foundations Modules List (Reused directly from FOREX_COURSE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beginnerLevel.topics.map((topic) => (
            <Link key={topic.id} href="/learn/forex" className="block group">
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 group-hover:border-[#00FF00]/40 transition-all duration-300 h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">{topic.icon}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#00FF00] transition-colors">
                      {topic.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {topic.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-900">
                    {topic.subheadings.map((sub) => (
                      <li key={sub.id} className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-[#00FF00] shrink-0" />
                          <span className="group-hover:text-white transition-colors">{sub.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{sub.readMinutes}m</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono font-bold text-[#00FF00]">
                  <span>Study Topic</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Simple Footer Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#00FF00]" />
            <span className="text-slate-300 font-medium">Zero cost. Zero sign-up required to read lessons.</span>
          </div>

          <Link href="/learn/forex" className="text-[#00FF00] hover:underline font-bold uppercase flex items-center gap-1">
            Access Full Course Tree <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
