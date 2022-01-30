import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middleware/basic-authentication-middleware";

const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  basicAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // usuário autenticado
      const user = req.user;

      if (!user) {
        throw new ForbiddenError("Usuário não informado.");
      }

      const jwtPayload = { username: user.username };
      const secreteKey = "my_secret_key";
      const jwtOptions = { subject: user?.uuid };

      const jwt = JWT.sign(jwtPayload, secreteKey, jwtOptions);

      res.status(StatusCodes.OK).send({ token: jwt });

      //
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
