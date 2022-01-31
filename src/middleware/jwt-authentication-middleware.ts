import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function jwtAuthenticationMiddleware(
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

    try {
      // verifica se o token é válido
      const secreteKey = "my_secret_key";
      const tokenPayload = JWT.verify(token, secreteKey);

      if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        throw new ForbiddenError("Token inválido.");
      }

      const uuid = tokenPayload.sub;
      /* como nesse ponto o token é validado e confiável
      pode-se eliminar uma busca na base de dados
      const user = await userRepository.findById(uuid);

      ficando...
    */
      const user = { uuid: tokenPayload.sub, username: tokenPayload.username };
      req.user = user;
      next();
    } catch (error) {
      throw new ForbiddenError("Token inválido.");
    }
  } catch (error) {
    next(error);
  }
}

export default jwtAuthenticationMiddleware;
