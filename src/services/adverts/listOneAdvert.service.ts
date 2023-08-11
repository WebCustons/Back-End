import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvertResponse } from "../../interfaces/advert.interfaces";
import { advertSchema, advertSchemaResponse } from "./../../schemas/advert.schema";
import { Repository } from 'typeorm';

export const listOneAdvertService = async (
  advertId: number
): Promise<TAdvertResponse> => {
  const advertRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

  const advert = await advertRepository.findOne({
    where: { id: advertId },
    relations: { user: true }
  });

  if (!advert) {
    throw new Error("Advert not found");
  }

  return advertSchemaResponse.parse(advert);
};
