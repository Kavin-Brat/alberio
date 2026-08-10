import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError";
import { verifyJwtToken } from "../utils/jwt";
import { getUserById } from "@/lib/db/userStore";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  name: string;
  entitlements: string[];
}

/**
 * Authenticates incoming JWT Bearer token and checks user status
 * Inspired by devportal_backend_2.0 verifyToken middleware
 */
export async function authenticateToken(req: Request): Promise<AuthenticatedUser> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization Bearer token is required");
  }

  const token = authHeader.substring(7);
  const payload = verifyJwtToken(token);

  if (!payload || !payload.userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired authorization token");
  }

  const user = await getUserById(payload.userId);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User associated with token no longer exists");
  }

  if (!user.isActive) {
    throw new ApiError(httpStatus.FORBIDDEN, "Account has been suspended or deactivated");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    entitlements: user.entitlements || [],
  };
}

/**
 * Higher-order middleware to require specific role or permission
 */
export function requireRole(allowedRoles: string[]) {
  return (user: AuthenticatedUser): void => {
    if (!allowedRoles.includes(user.role)) {
      throw new ApiError(httpStatus.FORBIDDEN, `Access denied. Requires role: ${allowedRoles.join(", ")}`);
    }
  };
}
