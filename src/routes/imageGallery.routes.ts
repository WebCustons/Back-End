import { Router } from "express";
import { ImageGallery } from "../entities/imageGallery.entities";
import { verifyAuthToken } from "../middlewares/authorization.middleware";
import { schemaValidator } from "../middlewares/schema.middlewares";
import { imageGallerySchemaRequest } from "../schemas/imageGallery.schema";
import { deleteImgAdvertController } from "../controllers/images/deleteImgAdvert.controller";
import { updateImgAdvertController } from "./../controllers/images/updateImgAdvert.controller";
import { createImgAdvertController } from "../controllers/images/createImgAdvert.controller";
import { isOwnerOrAdminAdverts } from "./../middlewares/adverts.middlewares";

export const imageGalleryRoutes = Router();

imageGalleryRoutes.post(
  "/:id",
  verifyAuthToken,
  isOwnerOrAdminAdverts,
  schemaValidator(imageGallerySchemaRequest),
  createImgAdvertController
);
imageGalleryRoutes.patch(
  "/:id",
  verifyAuthToken,
  isOwnerOrAdminAdverts,
  schemaValidator(imageGallerySchemaRequest),
  updateImgAdvertController
);
imageGalleryRoutes.delete(
  "/:id",
  verifyAuthToken,
  isOwnerOrAdminAdverts,
  deleteImgAdvertController
);
