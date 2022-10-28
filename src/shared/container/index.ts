import "reflect-metadata";
import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRespository'

import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository"
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository"

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository", SpecificationRepository
)
