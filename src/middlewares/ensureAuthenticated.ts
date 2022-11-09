import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken'
import { AppError } from "../errors/AppErros";

import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository"

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // essas informações vem do header
  const authHeader = request.headers.authorization;

  // se nao vier nada no token, segnifica q ele nao existe
  if (!authHeader) {
    throw new AppError("User does not exists!", 401)
  }

  // quando nós fzemos uma req Bearer, esse nome vem junto com o token
  // portanto, devemos tirar esse nome do conteudo do token
  // Ex: "Bearer 9*556541awdawd5985awd66awd3"
  // [0] = Bearer <-/|\-> [1] = 9*556541awdawd5985awd66awd3
  const [, token] = authHeader.split(" ") // vai utilizar o espaço como critério

  try {
    const { sub: user_id } = verify(token, "3z6365508471106") as IPayload; // se for vdd vai retornar as informacoes do token

    const userRepository = new UserRepository()

    const user = userRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists!", 401)
    }

    next()
  } catch {
    throw new AppError("Invalid token!", 401);
  }

}