import { Request, Response } from "express";
import { listAdvertService } from "../../services/adverts/listAdverts.service";
import { TAdvertResponse } from "../../interfaces/advert.interfaces";

export const listAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvertResponse[]>> => {
  const adverts: TAdvertResponse[] = await listAdvertService();

  return res.json(adverts);
};
