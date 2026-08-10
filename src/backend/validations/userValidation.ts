import Joi from "joi";

export const listUsersSchema = {
  query: Joi.object().keys({
    search: Joi.string().allow("").optional(),
    role: Joi.string().optional(),
    activeOnly: Joi.boolean().optional(),
  }),
};

export const updateUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid("SUPER_ADMIN", "ADMIN", "PROFESSIONAL", "PRO", "COURSE_BASIC", "FREE").optional(),
    subscriptionTier: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    riskProfile: Joi.string().valid("Conservative", "Moderate", "Aggressive").optional(),
  }),
};
