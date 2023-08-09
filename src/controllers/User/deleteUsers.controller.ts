import { Request, Response } from "express";
import { deleteAdvertService } from './../../services/adverts/deleteAdvert.service';
import { deleteUserService } from '../../services/users/deleteUsers.service';

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
  
  await deleteUserService(Number(res.locals.userId));

  return res.status(204).send();
};
