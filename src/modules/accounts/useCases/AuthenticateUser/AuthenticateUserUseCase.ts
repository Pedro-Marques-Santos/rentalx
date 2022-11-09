import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from "../../../../errors/AppErros";

interface IRequest {
  email: string,
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
}

@injectable()
class AuthenticateUserCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuario existe?
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Email or password incorret!")
    }

    const passwordMath = await compare(password, user.password)

    // Senha esta correta?
    if (!passwordMath) {
      throw new AppError("Email or password incorret!")
    }

    // Gerar jsonwebtoken
    const token = sign({}, "3z6365508471106", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn

  }
}

export { AuthenticateUserCase }