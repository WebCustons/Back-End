import { Router } from "express"
import { createAdvertsController } from "../controllers/adverts/createAdverts.controller"
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller"
import { listOneAdvertsController } from "../controllers/adverts/listOneAdvert.controller"
import { deleteAdvertsController } from "../controllers/adverts/deleteAdverts.controller"
import { schemaValidator } from "../middlewares/schema.middlewares"
import { advertSchemaRequest, advertSchemaRequestUpdate, } from "../schemas/advert.schema"
import { isOwner, isOwnerOrAdmin, verifyAuthToken } from "../middlewares/authorization.Middleware"
import { filteredAdvertsController } from './../controllers/adverts/listfiltersAdverts.controller';
import { createFiltesAdvertController } from './../controllers/adverts/createFiltesAdvert.controller ';
// import { updateAdvertsController } from './../controllers/adverts/updateAdverts.controller';

export const advertsRoutes = Router()

advertsRoutes.get("/filters", filteredAdvertsController)
advertsRoutes.get("/create/Filter", createFiltesAdvertController)
advertsRoutes.get(":id", listOneAdvertsController)
// advertsRoutes.patch(":id", verifyAuthToken,isOwner,  schemaValidator(advertSchemaRequestUpdate), updateAdvertsController);
advertsRoutes.delete(":id", verifyAuthToken, isOwnerOrAdmin, deleteAdvertsController)
advertsRoutes.post("", verifyAuthToken, schemaValidator(advertSchemaRequest), createAdvertsController)
advertsRoutes.get("", listAdvertsController)
