import { AuthController } from "@/backend/controllers/authController";

const controller = new AuthController();

export async function POST(request: Request) {
  return controller.handleRegister(request);
}
