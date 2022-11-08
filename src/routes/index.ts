import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router()

router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationRoutes)
router.use("/users", usersRoutes)
router.use(authenticateRouter);

export { router }