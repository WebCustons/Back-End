import { Request, Response } from "express";
import { updateAdvertService } from "../../services/adverts/updateAdvert.service";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvert } from "../../interfaces/advert.interfaces";

export const updateAdvertsController = async (
  req: Request,
  res: Response
): Promise<Response<TAdvert>> => {
  const updateAdverts: TAdvert = await updateAdvertService(
    req.body,
    Number(req.params.id)
  );

  return res.json(updateAdverts);
};
