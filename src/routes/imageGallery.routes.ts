import { Router } from "express";
import { createImgAdvertController } from "../controllers/images/createImgAdvert.controller";
import {
  isOwner,
  verifyAuthToken,
} from "../middlewares/authorization.middleware";
import { schemaValidator } from "../middlewares/schema.middlewares";
import { imageGallerySchemaRequest } from "../schemas/imageGallery.schema";
import { updateImgAdvertController } from "../controllers/images/updateImgAdvert.controller";
import { deleteImgAdvertController } from "../controllers/images/deleteImgAdvert.controller";

export const imageGalleryRoutes = Router();

imageGalleryRoutes.post(
  "/:id",
  verifyAuthToken,
  schemaValidator(imageGallerySchemaRequest),
  createImgAdvertController
);
imageGalleryRoutes.patch(
  "/:id",
  verifyAuthToken,
  schemaValidator(imageGallerySchemaRequest),
  //   isOwner,
  updateImgAdvertController
);
imageGalleryRoutes.delete(
  "/:id",
  verifyAuthToken,
  //  isOwner,
  deleteImgAdvertController
);
