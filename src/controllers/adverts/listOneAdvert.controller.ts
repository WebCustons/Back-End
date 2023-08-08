import { Request, Response } from "express";
import { listOneAdvertService } from "../../services/adverts/listOneAdvert.service";

export const listOneAdvertsController = async (req: Request, res: Response) => {
  const advertUser = await listOneAdvertService(Number(req.params.id));
  return advertUser;
};
