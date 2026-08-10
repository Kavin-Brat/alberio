"use client";

import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import CourseTree from "@/components/modules/Learn/CourseTree";
import BlogViewer from "@/components/modules/Learn/BlogViewer";
import LearnBreadcrumb from "@/components/modules/Learn/LearnBreadcrumb";
import { useCourseData } from "@/hooks/useCourseData";
import { Spinner } from "@/components/ui/Utils";
import { GlassCard } from "@/components/ui/Card";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Parent Page: Forex Course Page  (/learn/forex)
 * Split-view layout:
 *   Left Panel  → CourseTree accordion (Levels → Topics → Subheadings)
 *   Right Panel → BlogViewer (renders fetched lesson HTML)
 *
 * State is managed by the useCourseData hook.
 */
export default function ForexCoursePage() {
  const {
    courseData,
    courseLoading,
    courseError,
    selectedLevelId,
    selectedTopicId,
    selectedSubheadingId,
    selectLevel,
    selectTopic,
    selectSubheading,
    articleData,
    articleLoading,
    articleError,
  } = useCourseData();

  // ── Course tree loading ────────────────────────────────────────────────────
  if (courseLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner size="lg" color="green" label="Loading Forex course..." />
        </div>
      </PageContainer>
    );
  }

  // ── Course tree error ──────────────────────────────────────────────────────
  if (courseError || !courseData) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-sm text-red-400 font-mono">{courseError ?? "Failed to load course data."}</p>
          <Link href="/learn" className="text-xs text-[#00FF00] underline font-mono">← Back to Learn</Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6 font-sora">

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <LearnBreadcrumb
          items={[
            { label: "Learn", href: "/learn" },
            { label: "Forex" },
          ]}
        />

        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#00FF00] uppercase tracking-widest">
                Learn Forex
              </span>
              <span className="text-[10px] font-mono text-slate-600 border border-slate-800 px-2 py-0.5 rounded">
                {courseData.levels.reduce((s, l) => s + l.topics.reduce((t, tp) => t + tp.subheadings.length, 0), 0)} lessons
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {courseData.title}
            </h1>
            <p className="text-xs text-slate-400 font-light max-w-xl">{courseData.tagline}</p>
          </div>
          <Link href="/learn" className="shrink-0 flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors font-mono">
            <ArrowLeft className="w-3.5 h-3.5" /> All Subjects
          </Link>
        </div>

        {/* ── Split-view Layout ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 min-h-[70vh]">

          {/* Left — Course Tree */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <GlassCard className="p-4 bg-[#0b0b0b] border-slate-800 overflow-y-auto max-h-[calc(100vh-10rem)]">
              <CourseTree
                courseData={courseData}
                selectedLevelId={selectedLevelId}
                selectedTopicId={selectedTopicId}
                selectedSubheadingId={selectedSubheadingId}
                onSelectLevel={selectLevel}
                onSelectTopic={selectTopic}
                onSelectSubheading={selectSubheading}
              />
            </GlassCard>
          </div>

          {/* Right — Blog Viewer */}
          <div>
            <GlassCard className="p-6 sm:p-8 bg-[#0b0b0b] border-slate-800 min-h-[500px]">
              <BlogViewer
                article={articleData}
                loading={articleLoading}
                error={articleError}
              />
            </GlassCard>
          </div>

        </div>
      </div>
    </PageContainer>
  );
}
