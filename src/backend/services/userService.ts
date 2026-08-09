import { UserModel } from "../models/userModel";
import { getAllUsers, getUserById, updateUser, deleteUser } from "@/lib/db/userStore";

export class UserService {
  public async listUsers(search?: string, role?: string, activeOnly?: boolean): Promise<UserModel[]> {
    return getAllUsers(search, role, activeOnly);
  }

  public async getUser(id: string): Promise<UserModel | undefined> {
    return getUserById(id);
  }

  public async updateUserProfile(id: string, updates: Partial<UserModel>): Promise<UserModel | undefined> {
    return updateUser(id, updates);
  }

  public async deleteUserProfile(id: string): Promise<boolean> {
    return deleteUser(id);
  }
}

export const userService = new UserService();
