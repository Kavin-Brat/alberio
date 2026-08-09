import { UserModel } from "../models/userModel";
import { authenticateUser, createUser, getUserByEmail, getUserById } from "@/lib/db/userStore";
import { signJwtToken } from "../utils/jwt";
import { MenuService, MenuItem } from "./menuService";

export interface AuthLoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserModel;
  allowedMenus?: MenuItem[];
  error?: string;
  status?: number;
}

export class AuthService {
  /**
   * Authenticate credentials, issue JWT Bearer token, and return allowed menu list
   */
  public async login(email: string): Promise<AuthLoginResponse> {
    if (!email) {
      return { success: false, error: "Email is required", status: 400 };
    }

    const user = authenticateUser(email);

    if (!user) {
      return { success: false, error: "Invalid email or account does not exist", status: 401 };
    }

    if (!user.isActive) {
      return { success: false, error: "Account has been suspended or deactivated. Contact Admin.", status: 403 };
    }

    // Generate JWT Token signed with user payload
    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Get allowed menu list based on role
    const allowedMenus = MenuService.getAllowedMenusForRole(user.role);

    return {
      success: true,
      message: "Authentication successful",
      token,
      user,
      allowedMenus,
      status: 200
    };
  }

  /**
   * Register a new platform user and issue JWT Bearer token
   */
  public async register(name: string, email: string, role?: string, riskProfile?: string): Promise<AuthLoginResponse> {
    if (!email || !name) {
      return { success: false, error: "Name and email are required", status: 400 };
    }

    const existing = getUserByEmail(email);
    if (existing) {
      return { success: false, error: "User with this email already exists", status: 409 };
    }

    const newUser = createUser({
      name,
      email,
      role: role || "FREE",
      riskProfile: riskProfile || "Moderate"
    });

    const token = signJwtToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    });

    const allowedMenus = MenuService.getAllowedMenusForRole(newUser.role);

    return {
      success: true,
      message: "User registration successful",
      token,
      user: newUser,
      allowedMenus,
      status: 201
    };
  }

  /**
   * Get active user session and allowed menu list
   */
  public async getSession(userId: string): Promise<AuthLoginResponse> {
    const user = getUserById(userId);
    if (!user) {
      return { success: false, error: "User session not found", status: 404 };
    }

    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    const allowedMenus = MenuService.getAllowedMenusForRole(user.role);

    return {
      success: true,
      token,
      user,
      allowedMenus,
      status: 200
    };
  }
}
