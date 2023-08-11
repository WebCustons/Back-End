import { Router } from "express"
import { createAdvertsController } from "../controllers/adverts/createAdverts.controller"
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller"
import { listOneAdvertsController } from "../controllers/adverts/listOneAdvert.controller"
import { deleteAdvertsController } from "../controllers/adverts/deleteAdverts.controller"
import { schemaValidator } from "../middlewares/schema.middlewares"
import { advertSchemaRequest, advertSchemaRequestfilters, advertSchemaRequestUpdate, } from "../schemas/advert.schema"
import { filteredAdvertsController } from "./../controllers/adverts/listfiltersAdverts.controller"
import { updateAdvertsController } from "../controllers/adverts/updateAdverts.controller"
import { createFiltersAdvertController } from './../controllers/adverts/createFiltesAdvert.controller ';
import { verifyAuthToken, isOwner, isOwnerOrAdmin } from "../middlewares/authorization.middleware"

export const advertsRoutes = Router();

advertsRoutes.get("", listAdvertsController);

advertsRoutes.get("/:id", listOneAdvertsController);

advertsRoutes.post("", verifyAuthToken, schemaValidator(advertSchemaRequest), createAdvertsController);

advertsRoutes.patch("", verifyAuthToken, isOwner, schemaValidator(advertSchemaRequestUpdate), updateAdvertsController);

advertsRoutes.delete("/:id", verifyAuthToken, isOwnerOrAdmin, deleteAdvertsController);

advertsRoutes.get("/adverts-filters", schemaValidator(advertSchemaRequestfilters), createFiltersAdvertController);

advertsRoutes.post("/filtered", filteredAdvertsController);
