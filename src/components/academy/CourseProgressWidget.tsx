"use client";

import React from "react";
import { GraduationCap, CheckCircle2, PlayCircle, Award, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ACADEMY_COURSES } from "@/data/academyData";

export default function CourseProgressWidget() {
  const { user } = useAuth();

  const activeCourse = ACADEMY_COURSES.find(
    (c) => c.slug === (user.progress.enrolledCourseSlug || "forex-basics-free")
  ) || ACADEMY_COURSES[0];

  const progressPct = user.progress.courseProgressPct || 76;

  const modules = [
    { num: 1, title: "Forex Microstructure", status: "COMPLETED" },
    { num: 2, title: "Margin & Leverage Math", status: "COMPLETED" },
    { num: 3, title: "Market Structure & Liquidity", status: "COMPLETED" },
    { num: 4, title: "Support & Resistance Zones", status: "COMPLETED" },
    { num: 5, title: "Risk Management Fundamentals", status: "IN_PROGRESS" }
  ];

  return (
    <div className="w-full bg-hero-bg border border-border rounded-xl p-6 font-sora flex flex-col gap-5">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Albireo Academy Course Cockpit</span>
        </div>
        <span className="text-xs font-mono font-bold text-profit">Item 9 Sub-System</span>
      </div>

      {/* Course Title */}
      <div>
        <h3 className="text-xl font-extrabold text-foreground uppercase tracking-tight">
          {activeCourse.title}
        </h3>
        <p className="text-xs text-muted-foreground font-light mt-0.5">{activeCourse.tagline}</p>
      </div>

      {/* ASCII Progress Bar */}
      <div className="bg-secondary/60 border border-border p-4 rounded-lg flex flex-col gap-2 font-mono text-xs">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-sora font-bold">Course Completion Progress</span>
          <span className="font-bold text-primary">{progressPct}%</span>
        </div>
        <div className="text-primary font-bold text-sm tracking-widest">
          ████████████░░░ <span className="text-foreground text-xs">{progressPct}%</span>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-2 text-xs">
        {modules.map((m) => (
          <div key={m.num} className="p-2.5 bg-secondary/40 border border-border rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <span className="text-muted-foreground font-mono">Module 0{m.num}</span>
              <span>{m.title}</span>
            </div>
            {m.status === "COMPLETED" ? (
              <span className="text-profit font-bold text-sm">✓</span>
            ) : (
              <span className="text-primary font-bold text-sm">&rarr;</span>
            )}
          </div>
        ))}
      </div>

      {/* Current Lesson Box */}
      <div className="p-4 bg-secondary border border-primary/40 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <PlayCircle className="w-6 h-6 text-primary shrink-0" />
          <div>
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Current Lesson</span>
            <span className="text-xs font-bold text-foreground">Risk Management Fundamentals</span>
          </div>
        </div>

        <Link href={`/academy/${activeCourse.slug}`}>
          <Button variant="primary" size="sm" className="font-bold flex items-center gap-1 text-xs uppercase tracking-wider">
            Continue Lesson <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Quiz Scorecard */}
      <div className="p-3 bg-hero-bg border border-border rounded-lg flex items-center justify-between font-mono text-xs">
        <span className="text-muted-foreground font-sora">Module Quiz Scorecard</span>
        <span className="font-bold text-profit">████ 8/10 (Passed)</span>
      </div>
    </div>
  );
}
