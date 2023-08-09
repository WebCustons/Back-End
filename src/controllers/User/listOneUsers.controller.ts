import { Request, Response } from "express";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { listOneUserService } from '../../services/users/listOneUsers.service';

export const listOneUsersController = async (
  req: Request,
  res: Response
): Promise<TUserResponse> => {
  
  const UserUser: TUserResponse = await listOneUserService(Number(res.locals.userId));

  return UserUser;
};
