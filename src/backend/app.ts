import { NextResponse } from "next/server";
import httpStatus from "http-status";
import config from "./config/config";
import router from "./routes";
import { errorConverter, errorHandler } from "./middlewares/errorMiddleware";
import { ApiError } from "./utils/ApiError";
import { LoggerInfo } from "./utils/helpers";

/**
 * Enterprise Application Server Router & Middleware Dispatcher
 * Single Responsibility: Manages application configuration, client context extraction,
 * HTTP security header injection, and centralized operational error boundary handling.
 */
export class Application {
  public config = config;
  public router = router;

  /**
   * Dispatches incoming Web API Requests through security, logging, controller handling, and error middleware
   * @param req Web API Request object
   * @param handler Async route execution handler callback
   * @returns Web API NextResponse object
   */
  public async handleRequest(
    req: Request,
    handler: (req: Request) => Promise<NextResponse>
  ): Promise<NextResponse> {
    try {
      // Extract client IP address and user agent context
      const clientIp =
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for") ||
        req.headers.get("x-real-ip") ||
        "127.0.0.1";

      LoggerInfo(req, `${req.method} ${new URL(req.url).pathname} - IP: ${clientIp}`, "AppRouter");

      // Execute target controller route handler
      const response = await handler(req);

      // Inject Helmet-style security HTTP headers
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
   * Default 404 response handler for non-existent API route endpoints
   * @returns NextResponse with 404 HTTP status envelope
   */
  public handleNotFound(): NextResponse {
    const err = new ApiError(httpStatus.NOT_FOUND, "API route endpoint not found");
    return errorHandler(err);
  }
}

export const app = new Application();
export default app;
