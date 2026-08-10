import { roleController } from "../controllers/roleController";
import { catchAsync } from "../utils/catchAsync";

export const roleRoute = {
  list: catchAsync(async () => roleController.handleListRoles()),
  create: catchAsync(async (req: Request) => roleController.handleCreateRole(req)),
  get: catchAsync(async (req: Request, roleId: string) => roleController.handleGetRole(roleId)),
  update: catchAsync(async (req: Request, roleId: string) => roleController.handleUpdateRole(roleId, req)),
  delete: catchAsync(async (req: Request, roleId: string) => roleController.handleDeleteRole(roleId)),
};

export default roleRoute;
