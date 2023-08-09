import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvertResponse } from "../../interfaces/advert.interfaces";
import { advertSchema } from "../../schemas/advert.schema";
import { Repository } from 'typeorm';

export const listOneAdvertService = async (
  advertId: number
): Promise<TAdvertResponse> => {
  const advertRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

  const advert = await advertRepository.findOne({
    where: { id: advertId },
  });

  if (!advert) {
    throw new Error("Advert not found");
  }

  return advertSchema.parse(advert);
};
