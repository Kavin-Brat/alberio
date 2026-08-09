/**
 * User & Entitlement Model Definition
 * PostgreSQL-ready TypeScript Model
 */

export interface UserProgressModel {
  enrolledCourseSlug?: string;
  courseProgressPct: number;
  quizScores: Record<string, number>;
  completedLessons: string[];
  simulationsRun: number;
  tradesLoggedCount: number;
  savedWatchlist: string[];
  capitalAmountINR?: number;
}

export interface UserModel {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  subscriptionTier: string;
  funnelLevel: number;
  isActive: boolean;
  riskProfile: string;
  createdAt: string;
  lastLoginAt: string;
  progress: UserProgressModel;
  entitlements: string[];
}
