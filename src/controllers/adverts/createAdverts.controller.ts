import { Request, Response } from "express";
import { TAdvert, TAdvertRequest } from "../../interfaces/advert.interfaces";
import { createAdvertService } from "../../services/adverts/createAdvert.service";

export const createAdvertsController = async (req: Request, res: Response) => {
  const advert: TAdvertRequest = req.body;
  const userId = req.params.id;
  const newAdvert = await createAdvertService(advert, Number(userId));
  return res.status(201).json(newAdvert);
};
