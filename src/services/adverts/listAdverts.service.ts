import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { TAdvert } from "../../interfaces/advert.interfaces";
import { allAdvertSchema } from "../../schemas/advert.schema";

export const listAdvertService = async (): Promise<TAdvert[]> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const allAdverts = await advertRepository.find();

  return allAdvertSchema.parse(allAdverts);
};
