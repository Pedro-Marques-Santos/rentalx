import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

// vamos utilizar a biblioteca "yarn add csv-parse" para acessar o pipe de uma maneira mais fácil

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {

  constructor(private categoryRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // -  fazer leitura do arquivo em partes
      // -  path disponibiliza diversas funcionalidades úteis para acessar e interagir com o file
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      //por padrão o parse utilizar a virgula como delemitadir
      const parseFile = csvParse()

      // - pipe: cada pedaço do arquivo lido o pipe pode enviar esse paçado ao local q a gente determinar
      stream.pipe(parseFile)

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      })
        .on("end", () => {
          fs.promises.unlink(file.path)
          resolve(categories);
        })// parse finalizado
        .on("error", (err) => {
          reject(err)
        })
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoryRepository.findByName(name);

      if (!existCategory) {
        this.categoryRepository.create({
          name,
          description
        });
      }
    });

  }
}

export { ImportCategoryUseCase }