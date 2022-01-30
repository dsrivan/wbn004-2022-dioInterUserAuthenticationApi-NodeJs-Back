import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function bearerAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas.");
    }

    // exemplo do código de 'Bearer Token': Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQzNTgzNzk0LCJzdWIiOiJjZDZlOTdjYS0xNWMyLTQyNGItYjdkNS0xMTliNGYyYzQzNGEifQ.H-AioR8SWGdz8PLZwo4unzAfqJURQtjsvMDwFaHNvzc

    const [authenticationType, token] = authorizationHeader.split(" ");

    if (authenticationType !== "Bearer" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválida.");
    }

    // verifica se o token é válido
    const secreteKey = "my_secret_key";
    const tokenPayload = JWT.verify(token, secreteKey);

    if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
      throw new ForbiddenError("Token inválido.");
    }

    const uuid = tokenPayload.sub;
    const user = await userRepository.findById(uuid);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export default bearerAuthenticationMiddleware;
