import authRoute from "./auth.route";
import userRoute from "./user.route";
import roleRoute from "./role.route";

export interface RouteEntry {
  path: string;
  route: any;
}

export const defaultRoutes: RouteEntry[] = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/roles",
    route: roleRoute,
  },
];

export const router = {
  routes: defaultRoutes,
  auth: authRoute,
  users: userRoute,
  roles: roleRoute,
};

export default router;
