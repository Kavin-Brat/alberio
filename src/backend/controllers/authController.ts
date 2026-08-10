import { validateRequest } from "../middlewares/validate";
import { loginSchema, registerSchema, getSessionSchema } from "../validations/authValidation";
import { AuthService } from "../services/authService";
import { buildSuccessResponse } from "../utils/helpers";

const authService = new AuthService();

export class AuthController {
  public async handleLogin(request: Request) {
    const { body } = await validateRequest(request, loginSchema);
    const result = await authService.login(body.email);

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

  public async handleRegister(request: Request) {
    const { body } = await validateRequest(request, registerSchema);
    const { name, email, role, riskProfile } = body;

    const result = await authService.register(name, email, role, riskProfile);

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

  public async handleGetSession(request: Request) {
    const { query } = await validateRequest(request, getSessionSchema);
    const result = await authService.getSession(query.userId);

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

  public async handleLogout(request: Request) {
    let userId = "";
    try {
      const body = await request.json();
      userId = body?.userId || "";
    } catch (e) {
      // Body may be empty on logout request
    }

    const result = await authService.logout(userId);
    return buildSuccessResponse(null, result.message, 200);
  }
}

export const authController = new AuthController();
export default authController;
