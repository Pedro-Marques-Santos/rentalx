import "reflect-metadata";
import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRespository'

import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository"
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository"

import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository", SpecificationRepository
)

container.registerSingleton<IUserRepository>(
  "UserRepository", UserRepository
)