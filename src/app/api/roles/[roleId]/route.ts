import app from "@/backend/app";
import roleRoute from "@/backend/routes/role.route";

export async function GET(request: Request, { params }: { params: Promise<{ roleId: string }> }) {
  const { roleId } = await params;
  return app.handleRequest(request, (req) => roleRoute.get(req, roleId));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ roleId: string }> }) {
  const { roleId } = await params;
  return app.handleRequest(request, (req) => roleRoute.update(req, roleId));
}

export async function DELETE(request: Request, { params }: { params: Promise<{ roleId: string }> }) {
  const { roleId } = await params;
  return app.handleRequest(request, (req) => roleRoute.delete(req, roleId));
}
