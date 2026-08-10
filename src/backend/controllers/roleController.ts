import { validateRequest } from "../middlewares/validate";
import { createRoleSchema, updateRoleSchema } from "../validations/roleValidation";
import { roleService } from "../services/roleService";
import { buildSuccessResponse } from "../utils/helpers";

export class RoleController {
  public async handleListRoles() {
    const data = await roleService.listRoles();
    return buildSuccessResponse(data, "Roles and available permissions retrieved", 200);
  }

  public async handleCreateRole(request: Request) {
    const { body } = await validateRequest(request, createRoleSchema);
    const { displayName, roleKey, description, permissions } = body;

    const newRole = await roleService.createNewRole({
      displayName,
      roleKey,
      description: description || "",
      permissions: permissions || [],
    });

    return buildSuccessResponse({ role: newRole }, "Role created successfully", 201);
  }

  public async handleGetRole(roleId: string) {
    const role = await roleService.getRole(roleId);
    return buildSuccessResponse({ role }, "Role details retrieved", 200);
  }

  public async handleUpdateRole(roleId: string, request: Request) {
    const { body } = await validateRequest(request, updateRoleSchema);
    const updated = await roleService.updateExistingRole(roleId, body);

    return buildSuccessResponse({ role: updated }, "Role updated successfully", 200);
  }

  public async handleDeleteRole(roleId: string) {
    await roleService.removeRole(roleId);
    return buildSuccessResponse(null, "Role deleted successfully", 200);
  }
}

export const roleController = new RoleController();
