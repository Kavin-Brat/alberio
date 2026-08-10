"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, BookOpen, Clock } from "lucide-react";
import { CourseData, LevelMeta, TopicMeta, SubheadingMeta } from "@/hooks/useCourseData";

export interface CourseTreeProps {
  courseData: CourseData;
  selectedLevelId: string | null;
  selectedTopicId: string | null;
  selectedSubheadingId: string | null;
  onSelectLevel: (levelId: string) => void;
  onSelectTopic: (topicId: string) => void;
  onSelectSubheading: (lessonId: string) => void;
}

const LEVEL_COLOR: Record<string, { accent: string; badge: string; icon: string }> = {
  green:  { accent: "text-[#00FF00]", badge: "bg-[#00FF00]/10 text-[#00FF00] border-[#00FF00]/20", icon: "text-[#00FF00]" },
  amber:  { accent: "text-amber-400",  badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",  icon: "text-amber-400" },
  violet: { accent: "text-purple-400", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: "text-purple-400" },
};

/**
 * CourseTree Component
 * Three-level accordion tree: Level → Topic → Subheading.
 * Clicking a subheading triggers lesson content fetch in the parent hook.
 */
export default function CourseTree({
  courseData,
  selectedLevelId,
  selectedTopicId,
  selectedSubheadingId,
  onSelectLevel,
  onSelectTopic,
  onSelectSubheading,
}: CourseTreeProps) {
  return (
    <div className="space-y-2 font-sora">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
        <BookOpen className="w-4 h-4 text-[#00FF00] shrink-0" />
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
          {courseData.title}
        </span>
      </div>

      {courseData.levels.map((level) => {
        const c = LEVEL_COLOR[level.color] ?? LEVEL_COLOR.green;
        const isLevelOpen = selectedLevelId === level.id;
        const topicCount = level.topics.reduce((s, t) => s + t.subheadings.length, 0);

        return (
          <div key={level.id} className="rounded-lg border border-slate-800 overflow-hidden">
            {/* ── Level Header (accordion toggle) ────────────────────────── */}
            <button
              type="button"
              onClick={() => onSelectLevel(level.id)}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors cursor-pointer",
                isLevelOpen ? "bg-slate-900" : "bg-[#0b0b0b] hover:bg-slate-950"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className={cn("text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border", c.badge)}>
                  {level.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{topicCount} lessons</span>
              </div>
              <ChevronDown
                className={cn("w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200", isLevelOpen && "rotate-180")}
              />
            </button>

            {/* ── Topics ─────────────────────────────────────────────────── */}
            {isLevelOpen && (
              <div className="border-t border-slate-800">
                {level.topics.map((topic) => {
                  const isTopicOpen = selectedTopicId === topic.id;

                  return (
                    <div key={topic.id}>
                      {/* Topic toggle */}
                      <button
                        type="button"
                        onClick={() => onSelectTopic(topic.id)}
                        className={cn(
                          "w-full flex items-center justify-between gap-2 px-5 py-2.5 text-left transition-colors cursor-pointer",
                          isTopicOpen ? "bg-slate-900/80" : "bg-slate-950/50 hover:bg-slate-900/50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{topic.icon}</span>
                          <span className={cn("text-xs font-semibold", isTopicOpen ? "text-white" : "text-slate-400")}>
                            {topic.title}
                          </span>
                        </div>
                        <ChevronRight
                          className={cn("w-3 h-3 text-slate-600 shrink-0 transition-transform duration-200", isTopicOpen && "rotate-90")}
                        />
                      </button>

                      {/* ── Subheadings ─────────────────────────────────── */}
                      {isTopicOpen && (
                        <div className="border-t border-slate-800/50">
                          {topic.subheadings.map((sub, i) => {
                            const isActive = selectedSubheadingId === sub.id;
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => onSelectSubheading(sub.id)}
                                className={cn(
                                  "w-full flex items-center justify-between gap-2 pl-10 pr-4 py-2 text-left transition-colors cursor-pointer",
                                  isActive
                                    ? "bg-[#00FF00]/5 border-l-2 border-[#00FF00]"
                                    : "hover:bg-slate-900/40 border-l-2 border-transparent"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={cn("text-[10px] font-mono font-bold shrink-0 w-4", isActive ? c.accent : "text-slate-600")}>
                                    {i + 1}.
                                  </span>
                                  <span className={cn("text-xs font-medium leading-tight", isActive ? "text-white" : "text-slate-400 hover:text-slate-300")}>
                                    {sub.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <Clock className="w-3 h-3 text-slate-700" />
                                  <span className="text-[10px] font-mono text-slate-600">{sub.readMinutes}m</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
