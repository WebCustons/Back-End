import { AppDataSource } from "../../data-source";
import { Adverts, FuelType } from "../../entities/adverts.entities";
import { TAdvertRequestUpdate } from "../../interfaces/advert.interfaces";
import { allAdvertSchema } from "../../schemas/advert.schema";
import { IPagination } from './../../interfaces/pagina.interface';

export const listfiltersAdvertsService = async (
  pageReq: number,
  perPageReq: number,
  serverUrl: string,
  where: TAdvertRequestUpdate
): Promise<IPagination> => {
  const advertRepository = AppDataSource.getRepository(Adverts);

  const prevPage: string | null = pageReq - 1 < 1 ? null : `${serverUrl}/adverts/?page=${pageReq - 1}&perPage=${perPageReq}`;
  const nextPage: string | null = `${serverUrl}/adverts/?page=${pageReq + 1}&perPage=${perPageReq}`;

  const { brand, color, fuel, model, year, price, mileage } = where;

  const allAdvertsFilters = await advertRepository.find({
    take: perPageReq,
    skip: perPageReq * (pageReq - 1),
    order:{
      id:'ASC'
    },
    where: {
      ...(brand && { brand }),
      ...(color && { color }),
      ...(fuel && { fuel: fuel as FuelType }),
      ...(model && { model }),
      ...(year !== undefined && !isNaN(year) && { year }),
      ...(price !== undefined && !isNaN(price) && { price }),
      ...(mileage !== undefined && !isNaN(mileage) && { mileage }),
    },
    relations: {
      Users: true
    }
  });

  const totalCount = await advertRepository.count({
    where: {
      ...(brand && { brand }),
      ...(color && { color }),
      ...(fuel && { fuel: fuel as FuelType }),
      ...(model && { model }),
      ...(year !== undefined && !isNaN(year) && { year }),
      ...(price !== undefined && !isNaN(price) && { price }),
      ...(mileage !== undefined && !isNaN(mileage) && { mileage }),
    }
  });

  const totalPages = Math.ceil(totalCount / perPageReq);

  const nextAdverts = await advertRepository.find({
    take: perPageReq,
    skip: perPageReq * pageReq
  });

  const parsedAdverts = allAdvertSchema.parse(allAdvertsFilters);

  const pagination = {
    prevPage,
    nextPage: nextAdverts.length > 0 ? nextPage : null,
    totalPages,
    data: parsedAdverts
  };

  return pagination;
};
