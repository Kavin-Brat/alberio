"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, Tag } from "lucide-react";
import { LessonContent } from "@/hooks/useCourseData";

export interface BlogViewerProps {
  article: LessonContent | null;
  loading: boolean;
  error: string | null;
}

/**
 * BlogViewer Component
 * Renders the lesson article fetched from /api/lessons/:lessonId.
 * Content is HTML — rendered with dangerouslySetInnerHTML (controlled server data).
 * Shows placeholder state when no lesson is selected.
 */
export default function BlogViewer({ article, loading, error }: BlogViewerProps) {
  // ── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-[#00FF00] animate-spin" />
        <p className="text-xs text-slate-500 font-mono">Loading lesson...</p>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-3 text-center">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-2xl">
          ⚠️
        </div>
        <p className="text-xs text-red-400 font-mono">{error}</p>
      </div>
    );
  }

  // ── Empty / No Selection State ─────────────────────────────────────────────
  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center px-8">
        <div className="w-14 h-14 rounded-2xl bg-[#00FF00]/5 border border-[#00FF00]/20 flex items-center justify-center">
          <BookOpen className="w-7 h-7 text-[#00FF00]/40" />
        </div>
        <p className="text-sm font-bold text-slate-500">Select a lesson to start reading</p>
        <p className="text-xs text-slate-600 font-light max-w-xs">
          Expand a level on the left, pick a topic, then click any lesson to view the full article here.
        </p>
      </div>
    );
  }

  // ── Article View ───────────────────────────────────────────────────────────
  return (
    <article className="font-sora h-full overflow-y-auto">
      {/* Article Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5 rounded">
            {article.levelName}
          </span>
          <span className="text-[10px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5 rounded">
            {article.topicTitle}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {article.readMinutes} min read
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-[#00FF00] font-bold">Albireo Learn</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800 font-mono">
              <Tag className="w-2.5 h-2.5" /> {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Article Content — HTML rendered from API */}
      <div
        className={cn(
          "prose-learn", // custom CSS class — styles defined below via globals
          "text-slate-300 space-y-0"
        )}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
