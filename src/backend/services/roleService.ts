import { RoleModel, PermissionKeyModel } from "../models/roleModel";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole, ALL_PERMISSIONS } from "@/lib/db/roleStore";

export class RoleService {
  public async listRoles(): Promise<{ roles: RoleModel[]; availablePermissions: PermissionKeyModel[] }> {
    return {
      roles: getAllRoles(),
      availablePermissions: ALL_PERMISSIONS
    };
  }

  public async getRole(id: string): Promise<RoleModel | undefined> {
    return getRoleById(id);
  }

  public async createNewRole(data: { displayName: string; roleKey: string; description: string; permissions: string[] }): Promise<RoleModel> {
    return createRole(data);
  }

  public async updateExistingRole(id: string, updates: Partial<RoleModel>): Promise<RoleModel | undefined> {
    return updateRole(id, updates);
  }

  public async removeRole(id: string): Promise<boolean> {
    return deleteRole(id);
  }
}

export const roleService = new RoleService();
