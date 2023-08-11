import { Router } from "express";
import { ImageGallery } from "../entities/imageGallery.entities";
import { verifyAuthToken } from "../middlewares/authorization.middleware";
import { isOwner } from './../middlewares/authorization.middleware';
import { schemaValidator } from "../middlewares/schema.middlewares";
import { imageGallerySchemaRequest } from "../schemas/imageGallery.schema";
import { deleteImgAdvertController } from "../controllers/images/deleteImgAdvert.controller";
import { updateImgAdvertController } from './../controllers/images/updateImgAdvert.controller';
import { createImgAdvertController } from "../controllers/images/createImgAdvert.controller";

export const imageGalleryRoutes = Router();

imageGalleryRoutes.post("/:id", verifyAuthToken, schemaValidator(imageGallerySchemaRequest), createImgAdvertController);
imageGalleryRoutes.patch("/:id", verifyAuthToken, isOwner(ImageGallery), schemaValidator(imageGallerySchemaRequest), updateImgAdvertController);
imageGalleryRoutes.delete("/:id", verifyAuthToken, isOwner(ImageGallery),  deleteImgAdvertController);
