import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // essas informações vem do header
  const authHeader = request.headers.authorization;

  // se nao vier nada no token, segnifica q ele nao existe
  if (!authHeader) {
    throw new Error("Token missing");
  }

  // quando nós fzemos uma req Bearer, esse nome vem junto com o token
  // portanto, devemos tirar esse nome do conteudo do token
  // Ex: "Bearer 9*556541awdawd5985awd66awd3"
  // [0] = Bearer <-/|\-> [1] = 9*556541awdawd5985awd66awd3
  const [, token] = authHeader.split(" ") // vai utilizar o espaço como critério

  try {
    const { sub } = verify(token, "3z6365508471106") as IPayload; // se for vdd vai retornar as informacoes do token
    console.log(sub)
    next()
  } catch {
    throw new Error("Invalid token!");
  }

}