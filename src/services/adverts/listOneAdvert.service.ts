import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvert } from "../../interfaces/advert.interfaces";
import { advertSchema } from "./../../schemas/advert.schema";

export const listOneAdvertService = async (
  advertId: number
): Promise<TAdvert> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const advert = await advertRepository.findOne({
    where: { id: advertId },
  });

  if (!advert) {
    throw new Error("Advert not found");
  }

  return advertSchema.parse(advert);
};
