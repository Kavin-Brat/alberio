import { AuthController, authController } from "@/backend/controllers/authController";

const controller = new AuthController();

export async function POST(request: Request) {
  return controller.handleLogin(request);
}
