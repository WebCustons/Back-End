import { Router } from "express";
import { createAdvertsController } from "../controllers/adverts/createAdverts.controller";
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller";
import { listOneAdvertsController } from "../controllers/adverts/listOneAdvert.controller";
import { deleteAdvertsController } from "../controllers/adverts/deleteAdverts.controller";
import { updateAdvertsController } from "../controllers/adverts/updateAdverts.controller";

export const advertsRoutes = Router();

advertsRoutes.post("/", createAdvertsController);
advertsRoutes.get("/", listAdvertsController);
advertsRoutes.get("/:id", listOneAdvertsController);
advertsRoutes.patch("/:id", updateAdvertsController);
advertsRoutes.delete("/:id", deleteAdvertsController);
