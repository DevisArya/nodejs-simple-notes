import Joi from "joi";

const createNoteValidation = Joi.object({
  tittle: Joi.string().max(100).optional(),
  content: Joi.string().max(255).required(),
});

const updateNoteValidation = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  tittle: Joi.string().max(100).optional(),
  content: Joi.string().max(255).required(),
});

const getNoteValidation = Joi.string().max(100).required();

export { createNoteValidation, updateNoteValidation, getNoteValidation };
