import { Router } from "express";
import { ImageGallery } from "../entities/imageGallery.entities";
import { verifyAuthToken } from "../middlewares/authorization.middleware";
import { schemaValidator } from "../middlewares/schema.middlewares";
import { imageGallerySchemaRequest } from "../schemas/imageGallery.schema";
import { deleteImgAdvertController } from "../controllers/images/deleteImgAdvert.controller";
import { updateImgAdvertController } from "./../controllers/images/updateImgAdvert.controller";
import { createImgAdvertController } from "../controllers/images/createImgAdvert.controller";
import { isOwnerAdverts } from "./../middlewares/adverts.middlewares";

export const imageGalleryRoutes = Router();

imageGalleryRoutes.post(
  "/:id",
  verifyAuthToken,
  isOwnerAdverts,
  schemaValidator(imageGallerySchemaRequest),
  createImgAdvertController
);
imageGalleryRoutes.patch(
  "/:id",
  verifyAuthToken,
  isOwnerAdverts,
  schemaValidator(imageGallerySchemaRequest),
  updateImgAdvertController
);
imageGalleryRoutes.delete(
  "/:id",
  verifyAuthToken,
  isOwnerAdverts,
  deleteImgAdvertController
);
