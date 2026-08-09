export type UserRole =
  | "FREE"
  | "COURSE_BASIC"
  | "COURSE_ADVANCED"
  | "PRO"
  | "PRO_PLUS"
  | "PROFESSIONAL"
  | "RESEARCH"
  | "ENTERPRISE"
  | "ADMIN"
  | "SUPER_ADMIN"
  | "CEO";

export type EntitlementKey =
  | "BASIC_TOOLS"
  | "UNLIMITED_MONTE_CARLO"
  | "TRAILING_EQUITY_SIMULATION"
  | "HISTORICAL_COT_ALERTS"
  | "UNLIMITED_JOURNAL"
  | "SHARPE_SESSION_ANALYTICS"
  | "PDF_RISK_REPORTS"
  | "ACADEMY_PREMIUM_COURSES"
  | "AI_RESEARCH_SUMMARIES"
  | "PORTFOLIO_SIMULATOR"
  | "ENTERPRISE_API"
  | "WEALTH_ADVISORY"
  | "VIP_TELEGRAM"
  | "CEO_COMMAND_CENTER"
  | "USER_MANAGEMENT";

export interface UserProgress {
  funnelLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6; // Level 0 Internet -> Level 6 Capital/Wealth
  enrolledCourseSlug?: string;
  completedLessons: string[];
  currentLessonId?: string;
  courseProgressPct: number;
  quizScores: Record<string, number>;
  simulationsRun: number;
  tradesLoggedCount: number;
  capitalAmountINR?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  joinedDate: string;
  subscriptionTier: "Free" | "Pro Monthly" | "Pro Yearly" | "Professional" | "Enterprise" | "Staff Admin";
  subscriptionExpiry?: string;
  entitlements: EntitlementKey[];
  progress: UserProgress;
  riskProfile: "Conservative" | "Moderate" | "Aggressive";
  accountBalanceINR: number;
}

export interface RoadmapMilestone {
  id: string;
  year: number;
  phase: string;
  title: string;
  description: string;
  targetDate: string;
  status: "COMPLETED" | "IN_PROGRESS" | "PLANNED" | "FUTURE";
  progressPct: number;
  dependencies: string[];
  kpis: string[];
  category: "Technology" | "Education" | "SaaS" | "Intelligence" | "Quant" | "Track Record" | "Institutional" | "Wealth";
  deliverables: string[];
}

export interface OperatingTask {
  id: string;
  title: string;
  category: "Growth" | "Product" | "Content" | "Revenue" | "Operations";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: string;
  assignee: string;
}

export interface GoalHierarchy {
  vision10Year: string;
  strategy5Year: string;
  yearlyObjectives2026: string[];
  quarterlyOKRsQ1: string[];
  monthlyProjectsAug: string[];
  weeklySprints: string[];
  dailyTasks: OperatingTask[];
}

export interface CompetitiveCompetitor {
  company: string;
  strength: string;
  albireoResponse: string;
}
