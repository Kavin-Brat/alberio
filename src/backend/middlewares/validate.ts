import Joi from "joi";
import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError";

export interface ValidationSchema {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
}

/**
 * Validates request payload against Joi schema
 * Inspired by devportal_backend_2.0 & topsbizops validation middleware
 */
export async function validateRequest(
  req: Request,
  schema: ValidationSchema,
  paramsObject?: Record<string, string>
): Promise<{ body?: any; query?: any; params?: any }> {
  const result: any = {};

  if (schema.params && paramsObject) {
    const { value, error } = schema.params.validate(paramsObject, { allowUnknown: true });
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(", ");
      throw new ApiError(httpStatus.BAD_REQUEST, `Validation error: ${errorMessage}`);
    }
    result.params = value;
  }

  if (schema.query) {
    const url = new URL(req.url);
    const queryObj: Record<string, string> = {};
    url.searchParams.forEach((val, key) => {
      queryObj[key] = val;
    });

    const { value, error } = schema.query.validate(queryObj, { allowUnknown: true });
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(", ");
      throw new ApiError(httpStatus.BAD_REQUEST, `Validation error: ${errorMessage}`);
    }
    result.query = value;
  }

  if (schema.body && (req.method === "POST" || req.method === "PUT" || req.method === "PATCH")) {
    try {
      const jsonBody = await req.json();
      const { value, error } = schema.body.validate(jsonBody, { allowUnknown: true });
      if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new ApiError(httpStatus.BAD_REQUEST, `Validation error: ${errorMessage}`);
      }
      result.body = value;
    } catch (e: any) {
      if (e instanceof ApiError) throw e;
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid JSON payload");
    }
  }

  return result;
}
