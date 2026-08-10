import { userController } from "../controllers/userController";
import { catchAsync } from "../utils/catchAsync";

export const userRoute = {
  list: catchAsync(async (req: Request) => userController.handleListUsers(req)),
  get: catchAsync(async (req: Request, userId: string) => userController.handleGetUser(userId)),
  update: catchAsync(async (req: Request, userId: string) => userController.handleUpdateUser(userId, req)),
  delete: catchAsync(async (req: Request, userId: string) => userController.handleDeleteUser(userId)),
};

export default userRoute;
