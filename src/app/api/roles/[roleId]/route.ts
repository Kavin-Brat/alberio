import { RoleController } from "@/backend/controllers/roleController";

const controller = new RoleController();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roleId: string }> }
) {
  const { roleId } = await params;
  return controller.handleGetRole(roleId);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ roleId: string }> }
) {
  const { roleId } = await params;
  return controller.handleUpdateRole(roleId, request);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ roleId: string }> }
) {
  const { roleId } = await params;
  return controller.handleDeleteRole(roleId);
}
