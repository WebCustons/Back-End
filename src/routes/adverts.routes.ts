import { Router } from "express"
import { createAdvertsController } from "../controllers/adverts/createAdverts.controller"
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller"
import { listOneAdvertsController } from "../controllers/adverts/listOneAdvert.controller"
import { deleteAdvertsController } from "../controllers/adverts/deleteAdverts.controller"
import { updateAdvertsController } from "../controllers/adverts/updateAdverts.controller"
import { schemaValidator } from "../middlewares/schema.middlewares"
import {
  advertSchemaRequest,
  advertSchemaRequestUpdate,
} from "../schemas/advert.schema"
import {
  isOwner,
  isOwnerOrAdmin,
  verifyAuthToken,
} from "../middlewares/authorization.Middleware"

export const advertsRoutes = Router()

advertsRoutes.post(
  "/",
  verifyAuthToken,
  schemaValidator(advertSchemaRequest),
  createAdvertsController
)
advertsRoutes.get("/", listAdvertsController)
advertsRoutes.get("/:id", listOneAdvertsController)
// advertsRoutes.patch("/:id", verifyAuthToken,isOwner,  schemaValidator(advertSchemaRequestUpdate), updateAdvertsController);
advertsRoutes.delete(
  "/:id",
  verifyAuthToken,
  isOwnerOrAdmin,
  deleteAdvertsController
)
