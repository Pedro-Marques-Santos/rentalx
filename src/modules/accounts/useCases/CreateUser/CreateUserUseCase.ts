import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository) { }

  async execute({ name, username, email, password, driver_licence }: ICreateUserDTO): Promise<void> {

    await this.usersRepository.create({
      name,
      username,
      email,
      password,
      driver_licence
    })

  }

}

export { CreateUserCase }