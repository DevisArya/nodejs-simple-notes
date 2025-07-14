import noteService from "../service/note-service";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await noteService.createNote(user, request);
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  create,
};
