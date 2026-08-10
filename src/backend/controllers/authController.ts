import { validateRequest } from "../middlewares/validate";
import { loginSchema, registerSchema, getSessionSchema } from "../validations/authValidation";
import { AuthService } from "../services/authService";
import { buildSuccessResponse } from "../utils/helpers";

const authService = new AuthService();

/**
 * Auth Controller
 * 
 * Simple Explanation:
 * Handles incoming web requests for user authentication (Login, Register, Get Session, Logout).
 * 1. Validates incoming data (email, name, role).
 * 2. Calls AuthService to process business logic & database queries.
 * 3. Returns standard JSON success responses ({ success: true, data: {...} }).
 */
export class AuthController {
  /**
   * Handle user login request (POST /api/auth/login)
   */
  public async handleLogin(request: Request) {
    // 1. Validate request body against loginSchema
    const { body } = await validateRequest(request, loginSchema);

    // 2. Call auth service to verify user & issue JWT token
    const result = await authService.login(body.email);

    // 3. Return JSON success envelope with user, token, and allowed menus
    return buildSuccessResponse(
      {
        user: result.user,
        token: result.token,
        allowedMenus: result.allowedMenus,
      },
      result.message || "Login successful",
      200
    );
  }

  /**
   * Handle new user registration request (POST /api/auth/register)
   */
  public async handleRegister(request: Request) {
    // 1. Validate request body against registerSchema
    const { body } = await validateRequest(request, registerSchema);
    const { name, email, role, riskProfile } = body;

    // 2. Call auth service to create new user account
    const result = await authService.register(name, email, role, riskProfile);

    // 3. Return JSON success response with 201 Created status
    return buildSuccessResponse(
      {
        user: result.user,
        token: result.token,
        allowedMenus: result.allowedMenus,
      },
      result.message || "Account registered successfully",
      201
    );
  }

  /**
   * Handle session retrieval request (GET /api/auth/me)
   */
  public async handleGetSession(request: Request) {
    // 1. Validate URL search query (e.g. ?userId=usr-123)
    const { query } = await validateRequest(request, getSessionSchema);

    // 2. Get user session from auth service
    const result = await authService.getSession(query.userId);

    // 3. Return active user session details
    return buildSuccessResponse(
      {
        user: result.user,
        token: result.token,
        allowedMenus: result.allowedMenus,
      },
      "User session retrieved",
      200
    );
  }

  /**
   * Handle user logout request (POST /api/auth/logout)
   */
  public async handleLogout(request: Request) {
    let userId = "";
    try {
      const body = await request.json();
      userId = body?.userId || "";
    } catch (e) {
      // Body may be empty on logout request
    }

    // Call auth service to process sign-out logging
    const result = await authService.logout(userId);
    return buildSuccessResponse(null, result.message, 200);
  }
}

export const authController = new AuthController();
export default authController;
