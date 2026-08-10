import { NextResponse } from "next/server";
import httpStatus from "http-status";
import config from "./config/config";
import router from "./routes";
import { errorConverter, errorHandler } from "./middlewares/errorMiddleware";
import { ApiError } from "./utils/ApiError";
import { LoggerInfo } from "./utils/helpers";

export class Application {
  public config = config;
  public router = router;

  /**
   * Process request through security headers, routing registry, and error middleware
   */
  public async handleRequest(req: Request, handler: (req: Request) => Promise<NextResponse>): Promise<NextResponse> {
    try {
      // Client IP & User Agent context extraction
      const clientIp =
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for") ||
        req.headers.get("x-real-ip") ||
        "127.0.0.1";
      const userAgent = req.headers.get("user-agent") || "N/A";

      LoggerInfo(req, `${req.method} ${new URL(req.url).pathname} - IP: ${clientIp}`, "AppRouter");

      // Execute controller route handler
      const response = await handler(req);

      // Inject Security HTTP Headers (Helmet-style)
      response.headers.set("X-Content-Type-Options", "nosniff");
      response.headers.set("X-Frame-Options", "DENY");
      response.headers.set("X-XSS-Protection", "1; mode=block");
      response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

      return response;
    } catch (err: any) {
      const apiErr = errorConverter(err);
      return errorHandler(apiErr, req);
    }
  }

  /**
   * Default 404 handler for missing route endpoints
   */
  public handleNotFound(): NextResponse {
    const err = new ApiError(httpStatus.NOT_FOUND, "API route endpoint not found");
    return errorHandler(err);
  }
}

export const app = new Application();
export default app;
