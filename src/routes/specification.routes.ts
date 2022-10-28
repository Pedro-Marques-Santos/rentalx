import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
})

export { specificationRoutes } 