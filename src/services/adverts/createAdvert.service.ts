import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvert } from "../../interfaces/advert.interfaces";
import { advertSchema } from "./../../schemas/advert.schema";

export const createAdvertService = async (
  advertData: any,
  userId: number
): Promise<TAdvert> => {
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

  return advertSchema.parse(createdAdvert);
};
