import { NextResponse } from "next/server";
import { CATEGORIES } from "@/data/learnData";

/**
 * GET /api/categories
 * Returns all learning categories with their status (active | coming_soon).
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: CATEGORIES,
  });
}
