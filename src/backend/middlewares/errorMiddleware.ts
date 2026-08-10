import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError";
import config from "../config/config";
import { LoggerError, buildErrorResponse } from "../utils/helpers";

/**
 * Converts native or raw errors into an operational ApiError instance
 */
export function errorConverter(err: any): ApiError {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || (httpStatus as any)[statusCode] || "Internal Server Error";
    error = new ApiError(statusCode, message, false, err.stack);
  }
  return error;
}

/**
 * Handles ApiError and generates standardized JSON response & Winston error log
 */
export function errorHandler(err: ApiError, req: Request | null = null): NextResponse {
  let { statusCode, message } = err;

  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = (httpStatus as any)[httpStatus.INTERNAL_SERVER_ERROR] || "Internal Server Error";
  }

  const component = req ? new URL(req.url).pathname.replace(/\//g, "_") : "API";
  LoggerError(req, message, component, err.stack, statusCode);

  return buildErrorResponse(message, statusCode);
}
