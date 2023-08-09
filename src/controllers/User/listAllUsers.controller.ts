import { Request, Response } from "express";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { listUsersService } from "../../services/users/listUsers.service";

export const listUserssController = async (
  req: Request,
  res: Response
): Promise<Response<TUserResponse[]>> => {

  const Users: TUserResponse[] = await listUsersService();

  return res.json(Users);
};
