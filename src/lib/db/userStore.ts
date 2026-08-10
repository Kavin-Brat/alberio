import { DbUserSchema } from "./schema";
import { executeQuery, initPostgresSchema } from "./postgres";

// Pre-populated fallback in-memory store for local development without DB
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
      capitalAmountINR: 10000000
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
      capitalAmountINR: 2500000
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
      capitalAmountINR: 500000
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
      capitalAmountINR: 100000
    },
    entitlements: [
      "FREE_TOOLS",
      "BASIC_CALCULATORS"
    ]
  }
];

function mapRowToDbUser(row: any, entitlements: string[] = []): DbUserSchema {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    role: row.role,
    subscriptionTier: row.subscription_tier,
    funnelLevel: Number(row.funnel_level) || 1,
    isActive: Boolean(row.is_active),
    riskProfile: row.risk_profile || "Moderate",
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    lastLoginAt: row.last_login_at ? new Date(row.last_login_at).toISOString() : new Date().toISOString(),
    progress: typeof row.progress === "string" ? JSON.parse(row.progress) : row.progress || {
      courseProgressPct: 0,
      quizScores: {},
      completedLessons: [],
      simulationsRun: 0,
      tradesLoggedCount: 0,
      savedWatchlist: ["EUR/USD"]
    },
    entitlements: entitlements.length > 0 ? entitlements : ["FREE_TOOLS", "BASIC_CALCULATORS"]
  };
}

/**
 * Get all users with optional filtering (PostgreSQL primary, fallback secondary)
 */
export async function getAllUsers(search?: string, role?: string, activeOnly?: boolean): Promise<DbUserSchema[]> {
  const isPgActive = await initPostgresSchema();

  if (isPgActive) {
    let sql = `SELECT * FROM users WHERE 1=1`;
    const params: any[] = [];

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      sql += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(email) LIKE $${params.length})`;
    }

    if (role && role !== "ALL") {
      params.push(role);
      sql += ` AND role = $${params.length}`;
    }

    if (activeOnly) {
      sql += ` AND is_active = TRUE`;
    }

    sql += ` ORDER BY created_at DESC`;

    const res = await executeQuery(sql, params);
    if (res && res.rows.length > 0) {
      return res.rows.map((row) => mapRowToDbUser(row));
    }
  }

  // Fallback to in-memory store
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
export async function getUserById(id: string): Promise<DbUserSchema | undefined> {
  const isPgActive = await initPostgresSchema();

  if (isPgActive) {
    const res = await executeQuery(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [id]);
    if (res && res.rows.length > 0) {
      const entRes = await executeQuery(`SELECT entitlement_key FROM user_entitlements WHERE user_id = $1`, [id]);
      const entitlements = entRes ? entRes.rows.map((r) => r.entitlement_key) : [];
      return mapRowToDbUser(res.rows[0], entitlements);
    }
  }

  return USERS_DATABASE.find((u) => u.id === id);
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<DbUserSchema | undefined> {
  const isPgActive = await initPostgresSchema();

  if (isPgActive) {
    const res = await executeQuery(`SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1`, [email]);
    if (res && res.rows.length > 0) {
      const entRes = await executeQuery(`SELECT entitlement_key FROM user_entitlements WHERE user_id = $1`, [res.rows[0].id]);
      const entitlements = entRes ? entRes.rows.map((r) => r.entitlement_key) : [];
      return mapRowToDbUser(res.rows[0], entitlements);
    }
  }

  return USERS_DATABASE.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Authenticate credentials
 */
export async function authenticateUser(email: string): Promise<DbUserSchema | undefined> {
  return getUserByEmail(email);
}

/**
 * Create new user
 */
export async function createUser(userData: Partial<DbUserSchema>): Promise<DbUserSchema> {
  const isPgActive = await initPostgresSchema();
  const id = `usr-${Date.now()}`;
  const now = new Date().toISOString();

  const newUser: DbUserSchema = {
    id,
    email: userData.email || "",
    passwordHash: `pbkdf2_sha256_${Date.now()}`,
    name: userData.name || "New Trader",
    role: userData.role || "FREE",
    subscriptionTier: userData.subscriptionTier || "Free Level 2 Account",
    funnelLevel: 2,
    isActive: true,
    riskProfile: userData.riskProfile || "Moderate",
    createdAt: now,
    lastLoginAt: now,
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

  if (isPgActive) {
    await executeQuery(
      `INSERT INTO users (id, email, password_hash, name, role, subscription_tier, funnel_level, is_active, risk_profile, created_at, last_login_at, progress)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        newUser.id,
        newUser.email,
        newUser.passwordHash,
        newUser.name,
        newUser.role,
        newUser.subscriptionTier,
        newUser.funnelLevel,
        newUser.isActive,
        newUser.riskProfile,
        newUser.createdAt,
        newUser.lastLoginAt,
        JSON.stringify(newUser.progress)
      ]
    );

    for (const ent of newUser.entitlements) {
      await executeQuery(
        `INSERT INTO user_entitlements (user_id, entitlement_key) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [newUser.id, ent]
      );
    }
  }

  USERS_DATABASE.unshift(newUser);
  return newUser;
}

/**
 * Update user details or role
 */
export async function updateUser(id: string, updates: Partial<DbUserSchema>): Promise<DbUserSchema | undefined> {
  const isPgActive = await initPostgresSchema();

  if (isPgActive) {
    const fields: string[] = [];
    const params: any[] = [id];

    if (updates.name !== undefined) {
      params.push(updates.name);
      fields.push(`name = $${params.length}`);
    }
    if (updates.email !== undefined) {
      params.push(updates.email);
      fields.push(`email = $${params.length}`);
    }
    if (updates.role !== undefined) {
      params.push(updates.role);
      fields.push(`role = $${params.length}`);
    }
    if (updates.subscriptionTier !== undefined) {
      params.push(updates.subscriptionTier);
      fields.push(`subscription_tier = $${params.length}`);
    }
    if (updates.isActive !== undefined) {
      params.push(updates.isActive);
      fields.push(`is_active = $${params.length}`);
    }

    if (fields.length > 0) {
      await executeQuery(`UPDATE users SET ${fields.join(", ")} WHERE id = $1`, params);
    }

    return getUserById(id);
  }

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
export async function deleteUser(id: string): Promise<boolean> {
  const isPgActive = await initPostgresSchema();

  if (isPgActive) {
    const res = await executeQuery(`DELETE FROM users WHERE id = $1`, [id]);
    return Boolean(res && res.rowCount && res.rowCount > 0);
  }

  const initialLen = USERS_DATABASE.length;
  USERS_DATABASE = USERS_DATABASE.filter((u) => u.id !== id);
  return USERS_DATABASE.length < initialLen;
}
