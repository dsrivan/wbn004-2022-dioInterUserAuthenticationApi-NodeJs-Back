import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const usersRoute = Router();

usersRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
  const users = [{ userName: "Ivan" }];
  res.status(StatusCodes.OK).send({ users });
});

usersRoute.get(
  "/users/:uuid",
  (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.OK).send({ uuid });
  }
);

export default usersRoute;
