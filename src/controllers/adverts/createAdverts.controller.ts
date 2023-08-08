import { Request, Response } from "express";
import { TAdvertRequest } from "../../interfaces/advert.interfaces";
import { createAdvertService } from "../../services/adverts/createAdvert.service";
import { Adverts } from "../../entities/adverts.entities";

export const createAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<Adverts>> => {
  const advert: TAdvertRequest = req.body;
  const userId = req.params.id;

  const newAdvert = await createAdvertService(advert, Number(userId));

  return res.status(201).json(newAdvert);
};
