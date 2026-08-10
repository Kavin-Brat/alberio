import httpStatus from "http-status";
import { UserModel } from "../models/userModel";
import { getAllUsers, getUserById, updateUser, deleteUser } from "@/lib/db/userStore";
import { ApiError } from "../utils/ApiError";

export class UserService {
  public async listUsers(search?: string, role?: string, activeOnly?: boolean): Promise<UserModel[]> {
    return await getAllUsers(search, role, activeOnly);
  }

  public async getUser(id: string): Promise<UserModel> {
    const user = await getUserById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  }

  public async updateUserProfile(id: string, updates: Partial<UserModel>): Promise<UserModel> {
    const updated = await updateUser(id, updates);
    if (!updated) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found or update failed");
    }
    return updated;
  }

  public async deleteUserProfile(id: string): Promise<boolean> {
    const success = await deleteUser(id);
    if (!success) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found or delete failed");
    }
    return true;
  }
}

export const userService = new UserService();
