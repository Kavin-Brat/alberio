"use client";

import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { GlassCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ACADEMY_COURSES, Course } from "@/data/academyData";
import { GraduationCap, Clock, Star, PlayCircle, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

export default function AcademyCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Beginner", "Intermediate", "Prop Firm", "Mastery"];

  const filteredCourses = selectedCategory === "All"
    ? ACADEMY_COURSES
    : ACADEMY_COURSES.filter((c) => c.category === selectedCategory);

  return (
    <PageContainer>
      {/* HEADER HERO */}
      <div className="flex flex-col items-center text-center gap-4 font-sora py-6">
        <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,230,0,0.2)]">
          <GraduationCap className="w-4 h-4 text-primary" /> Albireo Academy
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl leading-tight">
          Free Information → Paid Transformation
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl font-light leading-relaxed">
          Don't just read articles. Master forex microstructure, drawdown mathematics, and institutional risk management with structured step-by-step masterclasses, practical drills, and trading templates.
        </p>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(34,230,0,0.3)]"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED COURSE HIGHLIGHT */}
      {ACADEMY_COURSES.find((c) => c.featured) && (
        <GlassCard className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-primary/40 bg-secondary/50 font-sora p-8 overflow-hidden relative">
          <div className="lg:col-span-8 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider">
                  Featured Masterclass
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-profit fill-profit" /> 4.95 Rating (890+ Students)
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
                Prop Firm Evaluation Mastery
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                Deconstruct trailing equity traps, calculate 5% daily loss limits, and pass FTMO & Funding Pips using 1,000-iteration Monte Carlo risk modeling.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-2 text-xs text-foreground font-medium border-y border-border py-4">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Duration</span>
                  <span className="font-bold text-primary">12 Hours HD</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Level</span>
                  <span className="font-bold text-foreground">Intermediate</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Price</span>
                  <span className="font-bold text-profit">₹1,999 <span className="line-through text-muted-foreground/60 text-[10px]">₹3,999</span></span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Includes</span>
                  <span className="font-bold text-foreground">Planner & Simulator</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/academy/prop-firm-evaluation-mastery">
                <Button variant="primary" size="md" className="font-bold flex items-center gap-2">
                  View Syllabus & Enroll (₹1,999) <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-hero-bg border border-border rounded-xl p-6 flex flex-col justify-center gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-primary font-bold border-b border-border pb-2 font-sora">
              <BookOpen className="w-4 h-4" /> Course Core Pillars
            </div>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-profit shrink-0" />
                <span>Trailing Equity Peak Liquidation Math</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-profit shrink-0" />
                <span>Monte Carlo 500-Iteration Survival Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-profit shrink-0" />
                <span>UTC Daily Loss Reset Management</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-profit shrink-0" />
                <span>Position Sizer Integration</span>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* COURSE CATALOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sora mt-8">
        {filteredCourses.map((course) => (
          <GlassCard
            key={course.slug}
            className="flex flex-col justify-between border-border group hover:border-primary/40 transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider">
                  {course.category}
                </span>
                {course.badge && (
                  <span className="px-2 py-0.5 rounded bg-profit/20 text-profit text-[9px] font-black uppercase">
                    {course.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                {course.title}
              </h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-3 mb-4">
                {course.tagline}
              </p>

              <div className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {course.durationHours} Hours HD Video</span>
                  <span className="flex items-center gap-1 text-profit"><Star className="w-3.5 h-3.5 fill-profit" /> {course.rating}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Students: {course.studentCount}</span>
                  <span>Level: {course.level}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border mt-4 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-foreground">₹{course.priceINR.toLocaleString()}</span>
                <span className="text-[10px] text-muted-foreground/60 line-through ml-1">₹{course.originalPriceINR.toLocaleString()}</span>
              </div>
              <Link href={`/academy/${course.slug}`}>
                <Button variant="primary" size="sm" className="font-bold flex items-center gap-1">
                  View Course <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
