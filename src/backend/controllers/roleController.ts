import { NextResponse } from "next/server";
import { roleService } from "../services/roleService";

export class RoleController {
  public async handleListRoles() {
    const data = await roleService.listRoles();
    return NextResponse.json(data);
  }

  public async handleCreateRole(request: Request) {
    try {
      const body = await request.json();
      const { displayName, roleKey, description, permissions } = body;

      if (!displayName || !roleKey) {
        return NextResponse.json({ error: "Display name and Role Key are required" }, { status: 400 });
      }

      const newRole = await roleService.createNewRole({ displayName, roleKey, description, permissions });

      return NextResponse.json({
        message: "Role created successfully",
        role: newRole
      }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  public async handleGetRole(roleId: string) {
    const role = await roleService.getRole(roleId);
    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }
    return NextResponse.json({ role });
  }

  public async handleUpdateRole(roleId: string, request: Request) {
    try {
      const body = await request.json();
      const updated = await roleService.updateExistingRole(roleId, body);

      if (!updated) {
        return NextResponse.json({ error: "Role not found" }, { status: 404 });
      }

      return NextResponse.json({
        message: "Role updated successfully",
        role: updated
      });
    } catch (error) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  public async handleDeleteRole(roleId: string) {
    try {
      const success = await roleService.removeRole(roleId);
      if (!success) {
        return NextResponse.json({ error: "Cannot delete system roles or role not found" }, { status: 400 });
      }
      return NextResponse.json({ message: "Role deleted successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
}

export const roleController = new RoleController();
