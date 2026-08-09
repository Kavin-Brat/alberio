import { DbUserSchema } from "./schema";

// Pre-populated PostgreSQL-ready dummy user store
let USERS_DATABASE: DbUserSchema[] = [
  {
    id: "usr-kavin-ceo",
    email: "kavin@albireo.com",
    passwordHash: "pbkdf2_sha256_kavin_secret_2026",
    name: "Kavin B Albireo (CEO Super Admin)",
    role: "SUPER_ADMIN",
    subscriptionTier: "Super Admin Enterprise",
    funnelLevel: 6,
    isActive: true,
    riskProfile: "Aggressive",
    createdAt: "2026-01-01T00:00:00Z",
    lastLoginAt: new Date().toISOString(),
    progress: {
      enrolledCourseSlug: "forex-foundations-30-day",
      courseProgressPct: 100,
      quizScores: { "quiz-m1": 100, "quiz-m2": 100 },
      completedLessons: ["fb-l1", "fb-l2", "fb-l3", "fb-l4", "fb-l5", "fb-l6"],
      simulationsRun: 150,
      tradesLoggedCount: 84,
      savedWatchlist: ["EUR/USD", "GBP/USD", "USD/JPY", "Gold (XAU)"],
      capitalAmountINR: 10000000 // ₹1 Crore
    },
    entitlements: [
      "FREE_TOOLS",
      "BASIC_CALCULATORS",
      "SAVE_JOURNAL",
      "ACADEMY_BASIC",
      "MONTE_CARLO_BASIC",
      "ACADEMY_PREMIUM",
      "UNLIMITED_JOURNAL",
      "ADVANCED_ANALYTICS",
      "UNLIMITED_MONTE_CARLO",
      "HISTORICAL_COT_ALERTS",
      "EXPERT_COMMUNITY",
      "API_ACCESS",
      "INSTITUTIONAL_REPORTS",
      "CUSTOM_DESK_RISK",
      "CEO_COMMAND_CENTER"
    ]
  },
  {
    id: "usr-alex-pro",
    email: "alex.vance@trader.io",
    passwordHash: "pbkdf2_sha256_alex_secret_2026",
    name: "Alex Vance (Pro Trader)",
    role: "PRO",
    subscriptionTier: "Albireo Pro Annual",
    funnelLevel: 4,
    isActive: true,
    riskProfile: "Moderate",
    createdAt: "2026-02-14T10:30:00Z",
    lastLoginAt: "2026-08-08T18:45:00Z",
    progress: {
      enrolledCourseSlug: "prop-firm-evaluation-mastery",
      courseProgressPct: 85,
      quizScores: { "quiz-m1": 95, "quiz-m2": 90 },
      completedLessons: ["fb-l1", "fb-l2", "fb-l3", "fb-l4"],
      simulationsRun: 42,
      tradesLoggedCount: 38,
      savedWatchlist: ["EUR/USD", "Gold (XAU)"],
      capitalAmountINR: 2500000 // ₹25 Lakhs
    },
    entitlements: [
      "FREE_TOOLS",
      "BASIC_CALCULATORS",
      "SAVE_JOURNAL",
      "ACADEMY_BASIC",
      "MONTE_CARLO_BASIC",
      "ACADEMY_PREMIUM",
      "UNLIMITED_JOURNAL",
      "ADVANCED_ANALYTICS",
      "UNLIMITED_MONTE_CARLO",
      "HISTORICAL_COT_ALERTS",
      "EXPERT_COMMUNITY"
    ]
  },
  {
    id: "usr-sarah-student",
    email: "sarah.jenkins@gmail.com",
    passwordHash: "pbkdf2_sha256_sarah_secret_2026",
    name: "Sarah Jenkins (Academy Student)",
    role: "COURSE_BASIC",
    subscriptionTier: "Basic Student Tier",
    funnelLevel: 2,
    isActive: true,
    riskProfile: "Conservative",
    createdAt: "2026-04-10T14:20:00Z",
    lastLoginAt: "2026-08-09T09:12:00Z",
    progress: {
      enrolledCourseSlug: "forex-basics-free",
      courseProgressPct: 76,
      quizScores: { "quiz-m1": 90, "quiz-m2": 100 },
      completedLessons: ["fb-l1", "fb-l2", "fb-l3"],
      simulationsRun: 8,
      tradesLoggedCount: 5,
      savedWatchlist: ["EUR/USD", "GBP/USD"],
      capitalAmountINR: 500000 // ₹5 Lakhs
    },
    entitlements: [
      "FREE_TOOLS",
      "BASIC_CALCULATORS",
      "SAVE_JOURNAL",
      "ACADEMY_BASIC",
      "MONTE_CARLO_BASIC"
    ]
  },
  {
    id: "usr-marcus-free",
    email: "marcus.free@yahoo.com",
    passwordHash: "pbkdf2_sha256_marcus_secret_2026",
    name: "Marcus Miller (Free Visitor)",
    role: "FREE",
    subscriptionTier: "Free Visitor",
    funnelLevel: 1,
    isActive: true,
    riskProfile: "Moderate",
    createdAt: "2026-06-01T11:00:00Z",
    lastLoginAt: "2026-08-07T16:20:00Z",
    progress: {
      enrolledCourseSlug: "forex-basics-free",
      courseProgressPct: 20,
      quizScores: {},
      completedLessons: ["fb-l1"],
      simulationsRun: 2,
      tradesLoggedCount: 1,
      savedWatchlist: ["EUR/USD"],
      capitalAmountINR: 100000 // ₹1 Lakh
    },
    entitlements: [
      "FREE_TOOLS",
      "BASIC_CALCULATORS"
    ]
  }
];

/**
 * Get all users with optional filtering
 */
export function getAllUsers(search?: string, role?: string, activeOnly?: boolean): DbUserSchema[] {
  let filtered = [...USERS_DATABASE];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  if (role && role !== "ALL") {
    filtered = filtered.filter((u) => u.role === role);
  }

  if (activeOnly) {
    filtered = filtered.filter((u) => u.isActive);
  }

  return filtered;
}

/**
 * Get single user by ID
 */
export function getUserById(id: string): DbUserSchema | undefined {
  return USERS_DATABASE.find((u) => u.id === id);
}

/**
 * Get user by email
 */
export function getUserByEmail(email: string): DbUserSchema | undefined {
  return USERS_DATABASE.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Authenticate credentials
 */
export function authenticateUser(email: string): DbUserSchema | undefined {
  return getUserByEmail(email);
}

/**
 * Create new user
 */
export function createUser(userData: Partial<DbUserSchema>): DbUserSchema {
  const newUser: DbUserSchema = {
    id: `usr-${Date.now()}`,
    email: userData.email || "",
    passwordHash: `pbkdf2_sha256_${Date.now()}`,
    name: userData.name || "New Trader",
    role: userData.role || "FREE",
    subscriptionTier: userData.subscriptionTier || "Free Level 2 Account",
    funnelLevel: 2,
    isActive: true,
    riskProfile: userData.riskProfile || "Moderate",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    progress: {
      enrolledCourseSlug: "forex-basics-free",
      courseProgressPct: 0,
      quizScores: {},
      completedLessons: [],
      simulationsRun: 0,
      tradesLoggedCount: 0,
      savedWatchlist: ["EUR/USD"],
      capitalAmountINR: 500000
    },
    entitlements: ["FREE_TOOLS", "BASIC_CALCULATORS", "SAVE_JOURNAL", "ACADEMY_BASIC"]
  };

  USERS_DATABASE.unshift(newUser);
  return newUser;
}

/**
 * Update user details or role
 */
export function updateUser(id: string, updates: Partial<DbUserSchema>): DbUserSchema | undefined {
  const index = USERS_DATABASE.findIndex((u) => u.id === id);
  if (index === -1) return undefined;

  USERS_DATABASE[index] = {
    ...USERS_DATABASE[index],
    ...updates
  };

  return USERS_DATABASE[index];
}

/**
 * Delete user
 */
export function deleteUser(id: string): boolean {
  const initialLen = USERS_DATABASE.length;
  USERS_DATABASE = USERS_DATABASE.filter((u) => u.id !== id);
  return USERS_DATABASE.length < initialLen;
}
