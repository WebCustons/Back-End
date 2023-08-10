import { AppDataSource } from "../../data-source";
import { Adverts, FuelType } from "../../entities/adverts.entities";
import { TAdvertRequestUpdate, TAdvertResponse } from "../../interfaces/advert.interfaces";
import { allAdvertSchema } from "../../schemas/advert.schema";

export const listfiltersAdvertsService = async (
  where: TAdvertRequestUpdate
): Promise<TAdvertResponse[]> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const { brand, color, fuel, model, year, price, mileage } = where;

  const allAdverts = await advertRepository.find({
    where: {
      ...(brand && { brand }),
      ...(color && { color }),
      ...(fuel && { fuel: fuel as FuelType }),
      ...(model && { model }),
      ...(year !== undefined && { year }),
      ...(price !== undefined && { price }),
      ...(mileage !== undefined && { mileage }),
    },
  });

  return allAdvertSchema.parse(allAdverts);
};
