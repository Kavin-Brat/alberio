"use client";

import { useState, useCallback, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SubheadingMeta {
  id: string;
  title: string;
  readMinutes: number;
  tags: string[];
}

export interface TopicMeta {
  id: string;
  title: string;
  icon: string;
  description: string;
  subheadings: SubheadingMeta[];
}

export interface LevelMeta {
  id: string;
  name: string;
  description: string;
  color: "green" | "amber" | "violet";
  topics: TopicMeta[];
}

export interface CourseData {
  category: string;
  title: string;
  tagline: string;
  levels: LevelMeta[];
}

export interface LessonContent {
  id: string;
  title: string;
  subtitle?: string;
  readMinutes: number;
  tags: string[];
  content: string; // HTML string
  levelName: string;
  topicTitle: string;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useCourseData — State Machine Hook for the Learn Forex Section
 *
 * Manages:
 *   - Course tree data (fetched once from /api/courses/forex)
 *   - selectedLevel, selectedTopic, selectedSubheading navigation state
 *   - Active lesson article content (fetched on demand from /api/lessons/:id)
 *
 * Architecture:
 *   useCourseData → CourseTree (displays tree) → BlogViewer (displays lesson)
 */
export function useCourseData() {
  // ── Course tree state ──────────────────────────────────────────────────────
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState<string | null>(null);

  // ── Navigation state ───────────────────────────────────────────────────────
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedSubheadingId, setSelectedSubheadingId] = useState<string | null>(null);

  // ── Article content state ──────────────────────────────────────────────────
  const [articleData, setArticleData] = useState<LessonContent | null>(null);
  const [articleLoading, setArticleLoading] = useState(false);
  const [articleError, setArticleError] = useState<string | null>(null);

  // ── Fetch course tree on mount ─────────────────────────────────────────────
  useEffect(() => {
    async function fetchCourse() {
      try {
        setCourseLoading(true);
        const res = await fetch("/api/courses/forex");
        const json = await res.json();
        if (!json.success) throw new Error(json.error ?? "Failed to load course");
        setCourseData(json.data);
        // Auto-expand the first level
        if (json.data.levels.length > 0) {
          setSelectedLevelId(json.data.levels[0].id);
        }
      } catch (err) {
        setCourseError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setCourseLoading(false);
      }
    }
    fetchCourse();
  }, []);

  // ── Select a level (accordion toggle) ────────────────────────────────────
  const selectLevel = useCallback((levelId: string) => {
    setSelectedLevelId((prev) => (prev === levelId ? null : levelId));
    setSelectedTopicId(null);
    setSelectedSubheadingId(null);
    setArticleData(null);
  }, []);

  // ── Select a topic ────────────────────────────────────────────────────────
  const selectTopic = useCallback((topicId: string) => {
    setSelectedTopicId((prev) => (prev === topicId ? null : topicId));
    setSelectedSubheadingId(null);
    setArticleData(null);
  }, []);

  // ── Select a subheading → fetch lesson content ─────────────────────────────
  const selectSubheading = useCallback(async (lessonId: string) => {
    if (selectedSubheadingId === lessonId) return; // already active
    setSelectedSubheadingId(lessonId);
    setArticleLoading(true);
    setArticleError(null);

    try {
      const res = await fetch(`/api/lessons/${lessonId}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Lesson not found");
      setArticleData(json.data);
    } catch (err) {
      setArticleError(err instanceof Error ? err.message : "Failed to load lesson");
      setArticleData(null);
    } finally {
      setArticleLoading(false);
    }
  }, [selectedSubheadingId]);

  // ── Derived helpers ───────────────────────────────────────────────────────
  const selectedLevel = courseData?.levels.find((l) => l.id === selectedLevelId) ?? null;
  const selectedTopic = selectedLevel?.topics.find((t) => t.id === selectedTopicId) ?? null;

  return {
    // Course data
    courseData,
    courseLoading,
    courseError,
    // Navigation state
    selectedLevelId,
    selectedTopicId,
    selectedSubheadingId,
    selectedLevel,
    selectedTopic,
    // Actions
    selectLevel,
    selectTopic,
    selectSubheading,
    // Article
    articleData,
    articleLoading,
    articleError,
  };
}
