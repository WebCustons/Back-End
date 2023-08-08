import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";

export const listOneAdvertService = async (
  advertId: number
): Promise<Adverts> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const advert = await advertRepository.findOne({
    where: { id: advertId },
  });

  if (!advert) {
    throw new Error("Advert not found");
  }

  return advert;
};
