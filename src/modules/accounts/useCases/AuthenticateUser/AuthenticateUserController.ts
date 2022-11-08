import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserCase } from "./AuthenticateUserUseCase";


class AuthenticateController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserCase = container.resolve(AuthenticateUserCase)

    const token = await authenticateUserCase.execute({ email, password })

    return response.json(token)
  }

}

export { AuthenticateController }