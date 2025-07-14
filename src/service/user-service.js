import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { getValidation, loginValidation, registerValidation, updateValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

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
      id: true,
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

  const token = uuid().toString();

  return prismaClient.user.update({
    where: {
      id: user.id,
    },

    data: {
      token: token,
    },
    select: {
      token: true,
    },
  });
};

const get = async (request) => {
  const id = validate(getValidation, request);

  const user = await PrismaClient.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      notes: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  return user;
};

const update = async (request) => {
  const user = validate(updateValidation, request);

  const countUser = await prismaClient.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!countUser) {
    throw new ResponseError(404, "user not found");
  }

  const data = {};

  if (!user.name) {
    data.name = user.name;
  }

  if (!user.password) {
    data.password = user.password;
  }

  if (!user.email) {
    data.email = user.email;
  }

  return prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: data,
    select: {
      email: true,
      name: true,
    },
  });
};

const logout = async (request) => {
  const userId = validate(getValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId.id,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  return prismaClient.user.update({
    where: {
      id: userId.id,
    },
    data: {
      token: null,
    },
    select: {
      id: true,
    },
  });
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
