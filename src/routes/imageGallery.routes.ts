import { Router } from "express";
import { createImgAdvertController } from "../controllers/adverts/createImgAdvert.controller";
import { verifyAuthToken } from "../middlewares/authorization.middleware";

export const imageGalleryRoutes = Router();

imageGalleryRoutes.post("/:id", verifyAuthToken, createImgAdvertController);
imageGalleryRoutes.patch("/:id");
