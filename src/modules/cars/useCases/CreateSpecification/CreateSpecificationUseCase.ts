import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string
}

//significa que essa class pode ser injetada
@injectable()
class CreateSpecificationUseCase {

  // fazendo isso para acessar os methodos do obj SpecificationCategory (!Create!)
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) { }

  // o method create de SpecificationRepository.ts vai ser acessado aqui
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExist = await this.specificationRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error("Specification already exists!")
    }

    await this.specificationRepository.create({
      name, description
    });
  }
}

export { CreateSpecificationUseCase }