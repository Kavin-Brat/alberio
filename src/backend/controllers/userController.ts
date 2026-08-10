import { validateRequest } from "../middlewares/validate";
import { listUsersSchema, updateUserSchema } from "../validations/userValidation";
import { userService } from "../services/userService";
import { buildSuccessResponse } from "../utils/helpers";

/**
 * User Controller Class
 * Single Responsibility: Handlers for user management HTTP endpoints (listing, retrieval, updates, deletion).
 */
export class UserController {
  /**
   * Handle user listing and search filtering
   * @param request Web API Request object
   */
  public async handleListUsers(request: Request) {
    const { query } = await validateRequest(request, listUsersSchema);
    const search = query?.search;
    const role = query?.role;
    const activeOnly = query?.activeOnly === true || query?.activeOnly === "true";

    const users = await userService.listUsers(search, role, activeOnly);

    return buildSuccessResponse(
      {
        totalCount: users.length,
        users,
      },
      "Users fetched successfully",
      200
    );
  }

  /**
   * Handle single user profile retrieval
   * @param userId Target User ID string
   */
  public async handleGetUser(userId: string) {
    const user = await userService.getUser(userId);
    return buildSuccessResponse({ user }, "User details retrieved", 200);
  }

  /**
   * Handle user profile modifications
   * @param userId Target User ID string
   * @param request Web API Request object
   */
  public async handleUpdateUser(userId: string, request: Request) {
    const { body } = await validateRequest(request, updateUserSchema);
    const updated = await userService.updateUserProfile(userId, body);

    return buildSuccessResponse(
      { user: updated },
      "User updated successfully",
      200
    );
  }

  /**
   * Handle user profile deletion
   * @param userId Target User ID string
   */
  public async handleDeleteUser(userId: string) {
    await userService.deleteUserProfile(userId);
    return buildSuccessResponse(null, "User deleted successfully", 200);
  }
}

export const userController = new UserController();
