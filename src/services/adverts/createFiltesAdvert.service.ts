import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { Repository } from 'typeorm';

export const createFiltersAdvertService = async (): Promise<{
  brandAdvert: string[];
  modelAdvert: string[];
  fuelAdvert: string[];
  colorAdvert: string[];
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
  minMileage: number;
  maxMileage: number;
}> => {
  const advertRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

  const distinctColumns = ["brand", "model", "fuel", "color"];
  const yearColumn = "year";
  const priceColumn = "price";
  const mileageColumn = "mileage";

  const distinctPromises = distinctColumns.map(column =>
    advertRepository.createQueryBuilder("adverts")
      .select(`DISTINCT(Adverts.${column})`, column)
      .getRawMany()
  );

  const yearRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${yearColumn}) as minYear, MAX(Adverts.${yearColumn}) as maxYear`)
    .getRawOne();

  const priceRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${priceColumn}) as minPrice, MAX(Adverts.${priceColumn}) as maxPrice`)
    .getRawOne();

  const mileageRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${mileageColumn}) as minMileage, MAX(Adverts.${mileageColumn}) as maxMileage`)
    .getRawOne();

  const [brandAdvert, modelAdvert, fuelAdvert, colorAdvert] = await Promise.all(distinctPromises);

  return {
    brandAdvert: brandAdvert.map(item => item.brand),
    modelAdvert: modelAdvert.map(item => item.model),
    fuelAdvert: fuelAdvert.map(item => item.fuel),
    colorAdvert: colorAdvert.map(item => item.color),
    minYear: yearRange.minyear,
    maxYear: yearRange.maxyear,
    minPrice: priceRange.minprice,
    maxPrice: priceRange.maxprice,
    minMileage: mileageRange.minmileage,
    maxMileage: mileageRange.maxmileage,
  };
};
