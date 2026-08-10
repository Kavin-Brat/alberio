import { NextResponse } from "next/server";
import { LESSON_MAP } from "@/data/learnData";

/**
 * GET /api/lessons/:lessonId
 * Returns the full HTML content for a specific lesson subheading.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params;
  const lesson = LESSON_MAP[lessonId];

  if (!lesson) {
    return NextResponse.json(
      { success: false, error: `Lesson '${lessonId}' not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: lesson,
  });
}
