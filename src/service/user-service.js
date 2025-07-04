import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { loginValidation, registerValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      name: user.name,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "username already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      name: true,
      email: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "email or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, "email or password wrong");
  }

  return {
    message: "login success",
  };
};

export default {
  register,
  login,
};
