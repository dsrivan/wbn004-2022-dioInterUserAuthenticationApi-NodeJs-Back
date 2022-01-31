import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import basicAuthenticationMiddleware from "../middleware/basic-authentication-middleware";
import jwtAuthenticationMiddleware from "../middleware/jwt-authentication-middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authorizationRoute = Router();

authorizationRoute.post(
  "/token/validate",
  jwtAuthenticationMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

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
