import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { Adverts } from "../../entities/adverts.entities";

export const createAdvertService = async (advertData: any, userId: number) => {
  const userRepository = AppDataSource.getRepository(Users);
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const advertRepository = AppDataSource.getRepository(Adverts);
  const newAdvert = advertRepository.create({
    ...advertData,
    user_: user,
  });

  const createdAdvert = await advertRepository.save(newAdvert);

  return createdAdvert;
};
