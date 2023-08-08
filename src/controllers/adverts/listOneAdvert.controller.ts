import { Request, Response } from "express";
import { listOneAdvertService } from "../../services/adverts/listOneAdvert.service";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvert } from "../../interfaces/advert.interfaces";

export const listOneAdvertsController = async (
  req: Request,
  res: Response
): Promise<TAdvert> => {
  const advertUser = await listOneAdvertService(Number(req.params.id));

  return advertUser;
};
