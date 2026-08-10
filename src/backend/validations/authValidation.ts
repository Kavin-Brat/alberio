import Joi from "joi";

export const loginSchema = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required().messages({
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
      }),
      password: Joi.string().allow("").optional(),
    })
    .unknown(),
};

export const registerSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().allow("").optional(),
      role: Joi.string()
        .valid("SUPER_ADMIN", "ADMIN", "PROFESSIONAL", "PRO", "COURSE_BASIC", "FREE")
        .default("FREE"),
      riskProfile: Joi.string().valid("Conservative", "Moderate", "Aggressive").default("Moderate"),
    })
    .unknown(),
};

export const getSessionSchema = {
  query: Joi.object()
    .keys({
      userId: Joi.string().required(),
    })
    .unknown(),
};
