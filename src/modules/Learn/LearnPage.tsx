"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import CategoryGrid from "@/components/modules/Learn/CategoryGrid";
import { CATEGORIES, Category } from "@/data/learnData";
import { BookOpen } from "lucide-react";

/**
 * Parent Page: Learn Landing Page  (/learn)
 * Level 2 — Category Selection:
 *   - Learn Forex (active → navigates to /learn/forex)
 *   - Learn Crypto / Futures / Stocks (coming soon)
 */
export default function LearnPage() {
  const router = useRouter();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  function handleCategorySelect(cat: Category) {
    if (cat.status === "active") {
      router.push(`/learn/${cat.slug}`);
    } else {
      setToastMsg(`${cat.title} is coming soon — stay tuned!`);
      setTimeout(() => setToastMsg(null), 3000);
    }
  }

  return (
    <PageContainer>
      <div className="space-y-10 font-sora">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="space-y-3 border-b border-slate-800 pb-8">
          <span className="text-[10px] font-mono font-bold text-[#00FF00] uppercase tracking-widest block">
            ALBIREO EDUCATION HUB
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Learn to Trade — From Zero to Funded
          </h1>
          <p className="text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
            Structured like BabyPips, built for prop firm traders. Every concept — from
            "What is a pip?" to Monte Carlo drawdown simulation — covered in one place.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500 font-mono pt-1">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#00FF00]" /> 20+ lessons
            </span>
            <span>3 skill levels</span>
            <span>100% Free</span>
          </div>
        </div>

        {/* ── Category Grid ────────────────────────────────────────────────── */}
        <div>
          <h2 className="text-base font-bold text-white mb-5">Choose a Subject</h2>
          <CategoryGrid categories={CATEGORIES} onSelect={handleCategorySelect} />
        </div>

        {/* ── Coming Soon Toast ─────────────────────────────────────────────── */}
        {toastMsg && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 rounded-lg px-5 py-3 text-xs font-mono text-slate-300 shadow-2xl">
            {toastMsg}
          </div>
        )}

      </div>
    </PageContainer>
  );
}
