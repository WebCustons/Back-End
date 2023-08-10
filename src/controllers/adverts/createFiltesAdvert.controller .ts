import { Request, Response } from "express";
import { createFiltersAdvertService } from './../../services/adverts/createFiltesAdvert.service';

export const createFiltersAdvertController = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {

  const filtes = await createFiltersAdvertService();
  return res.json(filtes);
};
