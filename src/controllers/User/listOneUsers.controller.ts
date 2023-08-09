import { Request, Response } from "express";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { listOneUserService } from './../../services/Users/listOneUsers.service';

export const listOneUsersController = async (
  req: Request,
  res: Response
): Promise<TUserResponse> => {
  
  const UserUser: TUserResponse = await listOneUserService(Number(req.params.id));

  return UserUser;
};
