/**
 * Authentication Constants & Storage Keys
 * Centralized registry for localStorage keys, public routes, and status labels.
 */

export const AUTH_STORAGE_KEYS = {
  ACTIVE_USER_ID: "albireo_active_user_id",
  IS_LOGGED_IN: "albireo_is_logged_in",
  JWT_TOKEN: "albireo_jwt_token",
  ALLOWED_MENUS: "albireo_allowed_menus",
  USER_SESSION: "albireo_user_session",
} as const;

export const PUBLIC_ROUTES: string[] = [
  "/",
  "/login",
  "/register",
  "/blog",
];

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful. JWT Bearer token issued.",
  REGISTER_SUCCESS: "Account registered successfully.",
  LOGOUT_SUCCESS: "Logged out successfully. Session cleared.",
  SESSION_RETRIEVED: "User session retrieved.",
  UNAUTHORIZED: "Authentication required to access protected module.",
  INVALID_CREDENTIALS: "Invalid email or password credentials.",
  SUSPENDED: "Account has been suspended. Please contact Admin.",
} as const;
