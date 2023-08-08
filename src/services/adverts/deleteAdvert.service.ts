import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";

export const deleteAdvertService = async (advertId: number): Promise<void> => {
  const advertRepository = AppDataSource.getRepository(Adverts);
  const advertisement = await advertRepository.findOne({
    where: { id: advertId },
  });

  if (!advertisement) {
    throw new Error("Advert not found");
  }

  await advertRepository.remove(advertisement);
};
