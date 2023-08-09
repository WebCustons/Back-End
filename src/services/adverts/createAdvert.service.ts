import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entities";
import { Adverts } from "../../entities/adverts.entities";
import {
  TAdvertRequest,
  TAdvertResponse,
} from "../../interfaces/advert.interfaces";
import { advertSchema } from "./../../schemas/advert.schema";

export const createAdvertService = async (
  advertData: TAdvertRequest,
  userId: number
): Promise<TAdvertResponse> => {
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
