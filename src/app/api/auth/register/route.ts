import app from "@/backend/app";
import authRoute from "@/backend/routes/auth.route";

export async function POST(request: Request) {
  return app.handleRequest(request, (req) => authRoute.register(req));
}
