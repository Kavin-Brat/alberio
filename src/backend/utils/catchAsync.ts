import { NextResponse } from "next/server";
import { errorConverter, errorHandler } from "../middlewares/errorMiddleware";

export type RouteHandler = (req: Request, context?: any) => Promise<NextResponse>;

/**
 * Async Route Handler Wrapper
 * Inspired by devportal_backend_2.0 catchAsync pattern
 */
export const catchAsync = (fn: RouteHandler): RouteHandler => {
  return async (req: Request, context?: any): Promise<NextResponse> => {
    try {
      return await fn(req, context);
    } catch (err: any) {
      const apiErr = errorConverter(err);
      return errorHandler(apiErr, req);
    }
  };
};
