import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';
import { Category } from "../../entities/Category";

import { getRepository, Repository } from "typeorm"

class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>

  constructor() {
    //da methodos para salvar no banco de dados
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    //findOne retorna um registro
    const category = await this.repository.findOne({ name })
    return category;
  }

}

export { CategoriesRepository }