import Joi from "joi";

export const createRoleSchema = {
  body: Joi.object()
    .keys({
      displayName: Joi.string().required(),
      roleKey: Joi.string().required(),
      description: Joi.string().allow("").optional(),
      permissions: Joi.array().items(Joi.string()).optional(),
    })
    .unknown(),
};

export const updateRoleSchema = {
  body: Joi.object()
    .keys({
      displayName: Joi.string().optional(),
      roleKey: Joi.string().optional(),
      description: Joi.string().allow("").optional(),
      permissions: Joi.array().items(Joi.string()).optional(),
      userCount: Joi.number().optional(),
      isSystem: Joi.boolean().optional(),
    })
    .unknown(),
};
