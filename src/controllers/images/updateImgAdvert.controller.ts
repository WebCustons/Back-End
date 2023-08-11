import { Request, Response } from "express";
import {
  TImageGalleryRequest,
  TImageGalleryResponse,
} from "../../interfaces/imageGallery.interfaces";
import { updateImgAdvertService } from "../../services/images/updateImgAdvert.controller";

export const updateImgAdvertController = async (
  req: Request,
  res: Response
): Promise<Response<TImageGalleryResponse>> => {
  const img: TImageGalleryRequest = req.body;

  const userId = Number(res.locals.userId);

  const updatedImg: TImageGalleryResponse = await updateImgAdvertService(
    Number(req.params.id),
    userId,
    img
  );

  return res.json(updatedImg);
};
