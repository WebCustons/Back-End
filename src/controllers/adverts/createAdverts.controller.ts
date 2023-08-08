import { Request, Response } from "express";
import {
  TAdvertRequest,
  TAdvertResponse,
} from "../../interfaces/advert.interfaces";
import { createAdvertService } from "../../services/adverts/createAdvert.service";

export const createAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvertResponse>> => {
  const advert: TAdvertRequest = req.body;
  const userId = req.params.id;

  const newAdvert: TAdvertResponse = await createAdvertService(
    advert,
    Number(userId)
  );

  return res.status(201).json(newAdvert);
};
