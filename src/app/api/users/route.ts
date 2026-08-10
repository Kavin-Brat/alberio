import app from "@/backend/app";
import userRoute from "@/backend/routes/user.route";

export async function GET(request: Request) {
  return app.handleRequest(request, (req) => userRoute.list(req));
}
