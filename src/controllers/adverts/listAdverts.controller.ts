import { Request, Response } from "express";
import { listAdvertService } from "../../services/adverts/listAdverts.service";

export const listAdvertsController = async (req: Request, res: Response) => {
  const adverts = await listAdvertService();
  return res.json(adverts);
};
