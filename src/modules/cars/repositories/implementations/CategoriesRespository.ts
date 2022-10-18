import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';
import { Category } from "../../model/Category";

class CategoriesRepository implements ICategoriesRepository {

  private categories: Category[] = [];

  // singleton -- Padrão de instância global
  private static INSTANCE: CategoriesRepository;

  //somente a class vai poder chamar o construder
  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) { // n tiver nenhum valor
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

}

export { CategoriesRepository }