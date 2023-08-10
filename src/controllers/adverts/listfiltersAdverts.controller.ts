import { Request, Response } from "express";
import { listfiltersAdvertsService } from "../../services/adverts/listfiltersAdverts.service";
import { TAdvertRequestUpdate, TAdvertResponse } from "../../interfaces/advert.interfaces";

export const listfiltersAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvertResponse[]>> => {
  const page = parseInt(req.query.page as string) || 1;
  const itemsPerPage = parseInt(req.query.pageSize as string) || 12;

  const where: TAdvertRequestUpdate = {
    ...req.body,
    year: Number(req.body.year),
    price: Number(req.body.price),
    mileage: Number(req.body.mileage),
  };

  const adverts: TAdvertResponse[] = await listfiltersAdvertsService(where);

  return res.json(adverts);
};
