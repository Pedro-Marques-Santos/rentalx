import { Router } from "express"

import { CreateUserController } from "../modules/accounts/useCases/CreateUser/CreateUserController"

const usersRoutes = Router()

const createUserController = new CreateUserController;

usersRoutes.post("/", (request, response) => {
  return createUserController.handle(request, response);
})

export { usersRoutes }