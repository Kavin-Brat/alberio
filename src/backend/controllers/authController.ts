import { NextResponse } from "next/server";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export class AuthController {
  public async handleLogin(request: Request) {
    try {
      const body = await request.json();
      const { email } = body;

      const result = await authService.login(email);

      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: result.status });
      }

      return NextResponse.json({
        success: true,
        message: result.message || "Login successful",
        token: result.token,
        user: result.user,
        allowedMenus: result.allowedMenus
      });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
  }

  public async handleRegister(request: Request) {
    try {
      const body = await request.json();
      const { name, email, role, riskProfile } = body;

      const result = await authService.register(name, email, role, riskProfile);

      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: result.status });
      }

      return NextResponse.json({
        success: true,
        message: result.message || "Account registered successfully",
        token: result.token,
        user: result.user,
        allowedMenus: result.allowedMenus
      }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
  }

  public async handleGetSession(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");

      if (!userId) {
        return NextResponse.json({ success: false, error: "UserId is required" }, { status: 400 });
      }

      const result = await authService.getSession(userId);

      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: result.status });
      }

      return NextResponse.json({
        success: true,
        token: result.token,
        user: result.user,
        allowedMenus: result.allowedMenus
      });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
  }
}

export const authController = new AuthController();
export default authController;
