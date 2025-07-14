import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import noteController from "../controller/note-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User Api
userRouter.get("/api/users/current", userController.get);
userRouter.update("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

//Note Api
userRouter.post("/api/notes", noteController.create);

export { userRouter };
