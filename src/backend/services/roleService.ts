import httpStatus from "http-status";
import { RoleModel, PermissionKeyModel } from "../models/roleModel";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole, ALL_PERMISSIONS } from "@/lib/db/roleStore";
import { ApiError } from "../utils/ApiError";

export class RoleService {
  public async listRoles(): Promise<{ roles: RoleModel[]; availablePermissions: PermissionKeyModel[] }> {
    return {
      roles: await getAllRoles(),
      availablePermissions: ALL_PERMISSIONS,
    };
  }

  public async getRole(id: string): Promise<RoleModel> {
    const role = await getRoleById(id);
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, "Role not found");
    }
    return role;
  }

  public async createNewRole(data: { displayName: string; roleKey: string; description: string; permissions: string[] }): Promise<RoleModel> {
    if (!data.displayName || !data.roleKey) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Display name and Role Key are required");
    }
    return await createRole(data);
  }

  public async updateExistingRole(id: string, updates: Partial<RoleModel>): Promise<RoleModel> {
    const updated = await updateRole(id, updates);
    if (!updated) {
      throw new ApiError(httpStatus.NOT_FOUND, "Role not found or update failed");
    }
    return updated;
  }

  public async removeRole(id: string): Promise<boolean> {
    const success = await deleteRole(id);
    if (!success) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Cannot delete system default roles or role not found");
    }
    return true;
  }
}

export const roleService = new RoleService();
