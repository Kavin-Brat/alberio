import { RoleController } from "@/backend/controllers/roleController";

const controller = new RoleController();

export async function GET() {
  return controller.handleListRoles();
}

export async function POST(request: Request) {
  return controller.handleCreateRole(request);
}
