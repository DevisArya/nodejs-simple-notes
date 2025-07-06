import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    id = req.user.id;
    const result = await userService.get(id);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    id = req.user.id;
    request = req.body;
    request.id = id;
    const result = await userService.update(request);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  get,
  update,
};
