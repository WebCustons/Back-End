import { Request, Response } from "express";
import { createImgAdvertService } from "../../services/adverts/createImgAdvert.service";
import { TImageGalleryResponse } from "../../interfaces/imageGallery.interfaces";

export const createImgAdvertController = async (
  req: Request,
  res: Response
): Promise<Response<TImageGalleryResponse>> => {
  const { image: url } = req.body;
  const userId = Number(res.locals.userId);
  const advertId = Number(req.params.id);

  const newImg = await createImgAdvertService(url, userId, advertId);

  return res.json(newImg);
};
