/**
 * Application Core Metadata & System Constants
 * Centralized registry for platform settings, branding strings, roles, and tiers.
 */

export const APP_CONFIG = {
  name: "ALBIREO",
  suffix: ".",
  fullTitle: "Albireo Trading Intelligence & Prop-Firm Terminal",
  version: "1.0.0",
  copyright: "© 2026 Albireo Financial Technologies Inc. All rights reserved.",
  supportEmail: "support@albireo.com",
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  CEO: "CEO",
  ADMIN: "ADMIN",
  PROFESSIONAL: "PROFESSIONAL",
  PRO: "PRO",
  COURSE_BASIC: "COURSE_BASIC",
  FREE: "FREE",
} as const;

export const RISK_PROFILES = {
  CONSERVATIVE: "Conservative",
  MODERATE: "Moderate",
  AGGRESSIVE: "Aggressive",
} as const;

export const SUBSCRIPTION_TIERS = {
  FREE: "Free Candidate",
  PRO: "Pro Trader ($49/mo)",
  INSTITUTIONAL: "Institutional Fund ($199/mo)",
  STAFF_ADMIN: "Staff Admin",
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
