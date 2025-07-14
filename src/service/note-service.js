import { createNoteValidation } from "../validation/note-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "./../app/database.js";

const createNote = async (user, request) => {
  const note = validate(createNoteValidation, request);

  note.userId = user.id;

  return prismaClient.note.create({
    data: note,
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
};

export default { createNote };
