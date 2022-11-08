import { Router } from "express";
import { AuthenticateController } from "../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const authenticateRouter = Router();

const authenticateController = new AuthenticateController()

authenticateRouter.post("/sessions", (request, response) => {
  return authenticateController.handle(request, response)
})

export { authenticateRouter }