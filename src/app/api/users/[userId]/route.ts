import { UserController } from "@/backend/controllers/userController";

const controller = new UserController();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  return controller.handleGetUser(userId);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  return controller.handleUpdateUser(userId, request);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  return controller.handleDeleteUser(userId);
}
