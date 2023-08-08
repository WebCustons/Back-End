import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvert } from "../../interfaces/advert.interfaces";
import { advertSchema } from "./../../schemas/advert.schema";

export const updateAdvertService = async (
  advertId: number,
  advertData: any
): Promise<TAdvert> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const advert = await advertRepository.findOne({
    where: { id: advertId },
  });

  if (!advert) {
    throw new Error("Advert not found");
  }

  const updatedAdvert = advertRepository.merge(advert, advertData);

  await advertRepository.save(updatedAdvert);

  return advertSchema.parse(updatedAdvert);
};
