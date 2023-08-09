import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { TUserResponse, TUserRequestUpdate } from "../../interfaces/user.interfaces";
import { userSchemaResponse } from '../../schemas/user.schema';

export const updateUserService = async (
  userId: number,
  userData: TUserRequestUpdate
): Promise<TUserResponse> => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = Object.assign(user, userData);

  await userRepository.save(updatedUser);

  return userSchemaResponse.parse(updatedUser);
};