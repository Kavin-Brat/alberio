import { authController } from "../controllers/authController";
import { catchAsync } from "../utils/catchAsync";

export const authRoute = {
  login: catchAsync(async (req: Request) => authController.handleLogin(req)),
  register: catchAsync(async (req: Request) => authController.handleRegister(req)),
  session: catchAsync(async (req: Request) => authController.handleGetSession(req)),
};

export default authRoute;
