import { AuthController } from "@/backend/controllers/authController";

const controller = new AuthController();

export async function GET(request: Request) {
  return controller.handleGetSession(request);
}
