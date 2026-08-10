import app from "@/backend/app";
import roleRoute from "@/backend/routes/role.route";

export async function GET(request: Request) {
  return app.handleRequest(request, () => roleRoute.list(request));
}

export async function POST(request: Request) {
  return app.handleRequest(request, (req) => roleRoute.create(req));
}
