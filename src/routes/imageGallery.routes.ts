import { Router } from "express";
import { createImgAdvertController } from "../controllers/adverts/createImgAdvert.controller";
import { ImageGallery } from "../entities/imageGallery.entities";
import { verifyAuthToken } from "../middlewares/authorization.middleware";
import { isOwner } from './../middlewares/authorization.middleware';

export const imageGalleryRoutes = Router();

imageGalleryRoutes.post("/:id", verifyAuthToken, createImgAdvertController);
imageGalleryRoutes.patch("/:id", verifyAuthToken,isOwner(ImageGallery));
