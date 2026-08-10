import app from "@/backend/app";
import userRoute from "@/backend/routes/user.route";

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return app.handleRequest(request, (req) => userRoute.get(req, userId));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return app.handleRequest(request, (req) => userRoute.update(req, userId));
}

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  return app.handleRequest(request, (req) => userRoute.delete(req, userId));
}
