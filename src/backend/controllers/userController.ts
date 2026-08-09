import { NextResponse } from "next/server";
import { userService } from "../services/userService";

export class UserController {
  public async handleListUsers(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const search = searchParams.get("search") || undefined;
      const role = searchParams.get("role") || undefined;
      const activeOnly = searchParams.get("activeOnly") === "true";

      const users = await userService.listUsers(search, role, activeOnly);

      return NextResponse.json({
        totalCount: users.length,
        users
      });
    } catch (error) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  public async handleGetUser(userId: string) {
    const user = await userService.getUser(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  }

  public async handleUpdateUser(userId: string, request: Request) {
    try {
      const body = await request.json();
      const updated = await userService.updateUserProfile(userId, body);

      if (!updated) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        message: "User updated successfully",
        user: updated
      });
    } catch (error) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  public async handleDeleteUser(userId: string) {
    try {
      const success = await userService.deleteUserProfile(userId);
      if (!success) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}

export const userController = new UserController();
