import { prismaClient } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res
      .status(401)
      .json({
        errors: "unauthorized",
      })
      .end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      res.status
        .json({
          errors: "unauthorized",
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};
