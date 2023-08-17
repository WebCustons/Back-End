import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { AppError } from "../../errors";
import { TLogin, loginResponse } from "../../interfaces/login.interfaces";

export const loginService = async (userData: TLogin): Promise<loginResponse> => {
  const userRepository = AppDataSource.getRepository(Users);

  const userResponse = await userRepository.findOneByOrFail({
    email: userData.email,
  });

  const comparePassword = await bcrypt.compare(
    userData.password,
    userResponse.password
  );

  if (!comparePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { email: userResponse.email, subject: userResponse.id },
    process.env.SECRET_KEY!,
    { expiresIn: "1d" }
  );

  const response: loginResponse = {
    token: token,
    id: userResponse.id,
  };

  return response;
};
