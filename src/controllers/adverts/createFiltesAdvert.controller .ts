import { Request, Response } from "express";
import { createFiltersAdvertService } from './../../services/adverts/createFiltesAdvert.service';
import { log } from 'console';

export const createFiltesAdvertController = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {

  const filtes = await createFiltersAdvertService();

  console.log(filtes);
  

  return res.json(filtes);
};
