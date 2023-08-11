import { Router } from "express";
import { createAdvertsController } from "../controllers/adverts/createAdverts.controller";
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller";
import { listOneAdvertsController } from "../controllers/adverts/listOneAdvert.controller";
import { deleteAdvertsController } from "../controllers/adverts/deleteAdverts.controller";
import { schemaValidator } from "../middlewares/schema.middlewares";
import {
  advertSchemaRequest,
  advertSchemaRequestUpdate,
} from "../schemas/advert.schema";
import {
  isOwner,
  isOwnerOrAdmin,
  verifyAuthToken,
} from "../middlewares/authorization.middleware";
import { filteredAdvertsController } from "./../controllers/adverts/listfiltersAdverts.controller";
import { updateAdvertsController } from "../controllers/adverts/updateAdverts.controller";
import { createFiltersAdvertController } from "./../controllers/adverts/createFiltesAdvert.controller ";
import { createImgAdvertController } from "../controllers/adverts/createImgAdvert.controller";

export const advertsRoutes = Router();

advertsRoutes.get("/adverts-filters", createFiltersAdvertController);
advertsRoutes.get("/filtered", filteredAdvertsController);
advertsRoutes.patch(
  "/:id",
  verifyAuthToken,
  /*isOwner ,*/ schemaValidator(advertSchemaRequestUpdate),
  updateAdvertsController
);
advertsRoutes.delete(
  "/:id",
  verifyAuthToken,
  /*isOwnerOrAdmin*/ deleteAdvertsController
);
advertsRoutes.get("/:id", listOneAdvertsController);
advertsRoutes.post(
  "/",
  verifyAuthToken,
  schemaValidator(advertSchemaRequest),
  createAdvertsController
);
advertsRoutes.get("/", listAdvertsController);
