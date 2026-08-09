import { UserController } from "@/backend/controllers/userController";

const controller = new UserController();

export async function GET(request: Request) {
  return controller.handleListUsers(request);
}
