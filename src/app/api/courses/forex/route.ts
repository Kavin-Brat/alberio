import { NextResponse } from "next/server";
import { FOREX_COURSE } from "@/data/learnData";

/**
 * GET /api/courses/forex
 * Returns the full Forex course hierarchy:
 *   Levels → Topics → Subheadings (without heavy content — just metadata)
 *
 * Content is stripped to keep the payload light.
 * Full lesson content is fetched via GET /api/lessons/:lessonId.
 */
export async function GET() {
  // Strip content from subheadings — only return metadata for the course tree
  const lightweight = {
    ...FOREX_COURSE,
    levels: FOREX_COURSE.levels.map((level) => ({
      ...level,
      topics: level.topics.map((topic) => ({
        ...topic,
        subheadings: topic.subheadings.map(({ id, title, readMinutes, tags }) => ({
          id,
          title,
          readMinutes,
          tags,
        })),
      })),
    })),
  };

  return NextResponse.json({
    success: true,
    data: lightweight,
  });
}
