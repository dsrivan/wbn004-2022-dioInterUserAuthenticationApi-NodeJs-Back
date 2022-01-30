import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const usersRoute = Router();

usersRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
  const users = [{ userName: "Ivan 1" }, { userName: "Ivan 2" }];
  res.status(StatusCodes.OK).send({ users });
});

usersRoute.get(
  "/users/:uuid",
  (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.OK).send({ uuid });
  }
);

usersRoute.post("/users", (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  res.status(StatusCodes.CREATED).send(newUser);
});

usersRoute.put(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const { userName } = req.body;

    const putUser = {
      uuid: uuid,
      userName: `${userName} + ${uuid}`,
    };

    res.status(StatusCodes.OK).send({ putUser });
  }
);

usersRoute.delete(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    res.status(StatusCodes.OK).send(`Success: Id ${uuid} deleted`);
  }
);

export default usersRoute;
