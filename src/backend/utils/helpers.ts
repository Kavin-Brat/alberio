import { NextResponse } from "next/server";
import logger from "../config/logger";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  code?: number;
  [key: string]: any;
}

export function buildSuccessResponse<T = any>(
  data?: T,
  message = "Success",
  statusCode = 200,
  extra: Record<string, any> = {}
): NextResponse {
  const body: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...extra,
  };
  return NextResponse.json(body, { status: statusCode });
}

export function buildErrorResponse(
  message = "An error occurred",
  statusCode = 500,
  errorDetails?: any
): NextResponse {
  const body: ApiResponse = {
    success: false,
    error: message,
    code: statusCode,
    ...(errorDetails && { details: errorDetails }),
  };
  return NextResponse.json(body, { status: statusCode });
}

export function LoggerInfo(req: Request | null, message: string, component = "Backend"): void {
  try {
    const url = req ? new URL(req.url).pathname : "";
    logger.info({
      message,
      component,
      url,
    });
  } catch (error) {
    console.log("Logger error:", error);
  }
}

export function LoggerError(
  req: Request | null,
  message: string,
  component = "Backend",
  stack?: string,
  statusCode = 500
): void {
  try {
    const url = req ? new URL(req.url).pathname : "";
    logger.error({
      message,
      component,
      url,
      statusCode,
      stack,
    });
  } catch (error) {
    console.log("Logger error:", error);
  }
}
