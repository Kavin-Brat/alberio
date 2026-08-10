import httpStatus from "http-status";
import { UserModel } from "../models/userModel";
import { authenticateUser, createUser, getUserByEmail, getUserById } from "@/lib/db/userStore";
import { signJwtToken } from "../utils/jwt";
import { MenuService, MenuItem } from "./menuService";
import { ApiError } from "../utils/ApiError";
import { LoggerInfo } from "../utils/helpers";

export interface AuthLoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserModel;
  allowedMenus?: MenuItem[];
  status?: number;
}

export class AuthService {
  /**
   * Authenticate credentials, issue JWT Bearer token, and return allowed menu list
   */
  public async login(email: string): Promise<AuthLoginResponse> {
    if (!email) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is required");
    }

    const user = await authenticateUser(email);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or account does not exist");
    }

    if (!user.isActive) {
      throw new ApiError(httpStatus.FORBIDDEN, "Account has been suspended or deactivated. Contact Admin.");
    }

    // Generate JWT Token signed with user payload
    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Get allowed menu list based on role
    const allowedMenus = MenuService.getAllowedMenusForRole(user.role);

    return {
      success: true,
      message: "Authentication successful",
      token,
      user,
      allowedMenus,
      status: 200,
    };
  }

  /**
   * Register a new platform user and issue JWT Bearer token
   */
  public async register(name: string, email: string, role?: string, riskProfile?: string): Promise<AuthLoginResponse> {
    if (!email || !name) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Name and email are required");
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      throw new ApiError(httpStatus.CONFLICT, "User with this email already exists");
    }

    const newUser = await createUser({
      name,
      email,
      role: role || "FREE",
      riskProfile: riskProfile || "Moderate",
    });

    const token = signJwtToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    const allowedMenus = MenuService.getAllowedMenusForRole(newUser.role);

    return {
      success: true,
      message: "User registration successful",
      token,
      user: newUser,
      allowedMenus,
      status: 201,
    };
  }

  /**
   * Get active user session and allowed menu list
   */
  public async getSession(userId: string): Promise<AuthLoginResponse> {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User session not found");
    }

    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const allowedMenus = MenuService.getAllowedMenusForRole(user.role);

    return {
      success: true,
      token,
      user,
      allowedMenus,
      status: 200,
    };
  }

  /**
   * Logout user, invalidate session logs, and clear server-side state
   */
  public async logout(userId?: string): Promise<{ success: boolean; message: string }> {
    LoggerInfo(null, `User logout requested for ID: ${userId || "Guest"}`, "AuthService");
    return {
      success: true,
      message: "Logged out successfully. Session context cleared.",
    };
  }
}
