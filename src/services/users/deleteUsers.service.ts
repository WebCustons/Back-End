import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";

export const deleteUserService = async (userId: number): Promise<void> => {

  const userRepository = AppDataSource.getRepository(Users);
  
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await userRepository.remove(user);
  
};
