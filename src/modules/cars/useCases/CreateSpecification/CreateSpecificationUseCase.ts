import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string
}

class CreateSpecificationUseCase {
  private specificationRepository: ISpecificationRepository

  // fazendo isso para acessar os methodos do obj SpecificationCategory (!Create!)
  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository
  }

  // o method create de SpecificationRepository.ts vai ser acessado aqui
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExist = this.specificationRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error("Specification already exists!")
    }

    this.specificationRepository.create({
      name, description
    });
  }
}

export { CreateSpecificationUseCase }