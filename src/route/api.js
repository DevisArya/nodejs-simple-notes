import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User Api
userRouter.get("/api/users/current", userController.get);
userRouter.update("/api/users/current", userController.update);

export { userRouter };
