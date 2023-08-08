import { Request, Response } from "express";
import { updateAdvertService } from "../../services/adverts/updateAdvert.service";

export const updateAdvertsController = async (req: Request, res: Response) => {
  const updateAdverts = await updateAdvertService(
    req.body,
    Number(req.params.id)
  );
  return res.json(updateAdverts);
};
