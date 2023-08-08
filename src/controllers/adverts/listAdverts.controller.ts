import { Request, Response } from "express";
import { listAdvertService } from "../../services/adverts/listAdverts.service";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvert } from "../../interfaces/advert.interfaces";

export const listAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvert[]>> => {
  const adverts = await listAdvertService();

  return res.json(adverts);
};
