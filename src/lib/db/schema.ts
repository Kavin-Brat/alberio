/**
 * Albireo User & Role Management Module — PostgreSQL Schema & Drizzle/Prisma Types Definition
 * 
 * PostgreSQL DDL SQL:
 * 
 * CREATE TABLE users (
 *   id VARCHAR(64) PRIMARY KEY,
 *   email VARCHAR(255) UNIQUE NOT NULL,
 *   password_hash VARCHAR(255) NOT NULL,
 *   name VARCHAR(255) NOT NULL,
 *   role VARCHAR(50) NOT NULL DEFAULT 'FREE',
 *   subscription_tier VARCHAR(50) NOT NULL DEFAULT 'Free Visitor',
 *   funnel_level INT NOT NULL DEFAULT 1,
 *   is_active BOOLEAN NOT NULL DEFAULT TRUE,
 *   risk_profile VARCHAR(50) NOT NULL DEFAULT 'Moderate',
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 *   last_login_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * CREATE TABLE user_entitlements (
 *   id SERIAL PRIMARY KEY,
 *   user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
 *   entitlement_key VARCHAR(100) NOT NULL,
 *   granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 *   UNIQUE(user_id, entitlement_key)
 * );
 * 
 * CREATE TABLE activity_logs (
 *   id SERIAL PRIMARY KEY,
 *   user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
 *   action VARCHAR(100) NOT NULL,
 *   ip_address VARCHAR(45),
 *   details TEXT,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
 * );
 */

export interface DbUserSchema {
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
  progress: {
    enrolledCourseSlug?: string;
    courseProgressPct: number;
    quizScores: Record<string, number>;
    completedLessons: string[];
    simulationsRun: number;
    tradesLoggedCount: number;
    savedWatchlist: string[];
    capitalAmountINR?: number;
  };
  entitlements: string[];
}

export interface DbActivityLogSchema {
  id: string;
  userId: string;
  action: string;
  ipAddress: string;
  details: string;
  createdAt: string;
}
