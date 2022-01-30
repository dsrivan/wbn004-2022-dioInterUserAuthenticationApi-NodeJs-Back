import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas.");
    }

    // exemplo do código de 'Basic Auth': Basic YWRtaW46YWRtaW4

    const [authenticationType, token] = authorizationHeader.split(" ");

    if (authenticationType !== "Basic" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválida.");
    }

    // converte de base 64 para string
    const tokenContent = Buffer.from(token, "base64").toString("utf-8");

    const [username, password] = tokenContent.split(":");

    if (!username || !password) {
      throw new ForbiddenError("Credenciais não preenchidas.");
    }

    const user = await userRepository.findByUsernameAndPassword(
      username,
      password
    );

    /*
      "iis" > o domínio da aplicação geradora do token
      "sub" > é o assunto do token, mas é muito utilizado para guardar o ID do usuário
      "aud" > define quem pode usar o token
      "exp" > data para expiração do token
      "nbf" > define uma data para qual o token possa passar a ser aceito
      "iat" > data de criação do token
      "jti" > o ID do token
    */

    if (!user) {
      throw new ForbiddenError("Usuário ou senha inválidos.");
    }

    // todos receberão o usuário autenticado
    req.user = user;
    next();

    //.
  } catch (error) {
    //
  }
}

export default basicAuthenticationMiddleware;
