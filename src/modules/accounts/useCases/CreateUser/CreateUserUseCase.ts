import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

import { hash } from "bcryptjs"

@injectable()
class CreateUserCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository) { }

  async execute({ name, email, password, driver_licence }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    //criptografar senha
    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_licence
    })

  }

}

export { CreateUserCase }