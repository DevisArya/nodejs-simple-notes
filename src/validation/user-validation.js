import Joi from "joi";

const registerValidation = Joi.object({
  name: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

const updateValidation = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  name: Joi.string().max(100).optional(),
  password: Joi.string().max(100).optional(),
  email: Joi.string().max(100).optional(),
});

export { registerValidation, loginValidation, getValidation, updateValidation };
