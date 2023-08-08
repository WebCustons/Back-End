import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";

export const listAdvertService = async (): Promise<Adverts[]> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const allAdverts = await advertRepository.find();

  return allAdverts;
};
