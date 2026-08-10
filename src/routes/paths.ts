/**
 * Centralized Route Paths Registry
 * Inspired by devportal_frontend_2.0 & topsweb routes architecture
 */

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  TERMINAL: "/terminal",
  JOURNAL: "/journal",
  PROP_FIRMS: "/prop-firms",
  ACADEMY: "/academy",
  PRICING: "/pricing",
  BLOG: "/blog",
  ADMIN: {
    ROOT: "/admin",
    USERS: "/admin/users",
    ROLES: "/admin/roles",
  },
  TOOLS: {
    ROOT: "/tools",
    COT_ANALYZER: "/tools/cot-analyzer",
  },
} as const;

export default PATHS;
