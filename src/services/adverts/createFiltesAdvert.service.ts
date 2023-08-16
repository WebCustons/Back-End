import { AppDataSource } from "../../data-source";
import { Adverts, FuelType } from "../../entities/adverts.entities";
import { Repository } from 'typeorm';
import { TAdvertRequestUpdate } from "../../interfaces/advert.interfaces";

export const createFiltersAdvertService = async (where: TAdvertRequestUpdate): Promise<any> => {
  const advertRepository: Repository<Adverts> = AppDataSource.getRepository(Adverts);

  const distinctColumns = ["brand", "model", "fuel", "color"];
  const yearColumn = "year";
  const priceColumn = "price";
  const mileageColumn = "mileage";


  const { brand, color, fuel, model, year, price, mileage } = where;

  console.log(brand);
  
  const distinctPromises = distinctColumns.map(column =>
    advertRepository.createQueryBuilder("adverts")
      .select(`DISTINCT(Adverts.${column})`, column)
      .where(brand ? "adverts.brand = :brand" : "1=1", { brand })
      .andWhere(color ? "adverts.color = :color" : "1=1", { color })
      .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
      .andWhere(model ? "adverts.model = :model" : "1=1", { model })
      .andWhere(year !== undefined ? "adverts.year = :year" : "1=1", { year })
      .andWhere(price !== undefined ? "adverts.price <= :price" : "1=1", { price })
      .andWhere(mileage !== undefined ? "adverts.mileage <= :mileage" : "1=1", { mileage })
      .getRawMany()

  );

  const yearRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${yearColumn}) as minYear, MAX(Adverts.${yearColumn}) as maxYear`)
    .where(brand ? "adverts.brand = :brand" : "1=1", { brand })
    .andWhere(color ? "adverts.color = :color" : "1=1", { color })
    .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
    .andWhere(model ? "adverts.model = :model" : "1=1", { model })
    .andWhere(year !== undefined ? "adverts.year = :year" : "1=1", { year })
    .andWhere(price !== undefined ? "adverts.price <= :price" : "1=1", { price })
    .andWhere(mileage !== undefined ? "adverts.mileage <= :mileage" : "1=1", { mileage })
    .getRawOne();

  const priceRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${priceColumn}) as minPrice, MAX(Adverts.${priceColumn}) as maxPrice`)
    .where(brand ? "adverts.brand = :brand" : "1=1", { brand })
    .andWhere(color ? "adverts.color = :color" : "1=1", { color })
    .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
    .andWhere(model ? "adverts.model = :model" : "1=1", { model })
    .andWhere(year !== undefined ? "adverts.year = :year" : "1=1", { year })
    .andWhere(price !== undefined ? "adverts.price <= :price" : "1=1", { price })
    .andWhere(mileage !== undefined ? "adverts.mileage <= :mileage" : "1=1", { mileage })
    .getRawOne();

  const mileageRange = await advertRepository.createQueryBuilder("adverts")
    .select(`MIN(Adverts.${mileageColumn}) as minMileage, MAX(Adverts.${mileageColumn}) as maxMileage`)
    .where(brand ? "adverts.brand = :brand" : "1=1", { brand })
    .andWhere(color ? "adverts.color = :color" : "1=1", { color })
    .andWhere(fuel ? "adverts.fuel = :fuel" : "1=1", { fuel: fuel as FuelType })
    .andWhere(model ? "adverts.model = :model" : "1=1", { model })
    .andWhere(year !== undefined ? "adverts.year = :year" : "1=1", { year })
    .andWhere(price !== undefined ? "adverts.price <= :price" : "1=1", { price })
    .andWhere(mileage !== undefined ? "adverts.mileage <= :mileage" : "1=1", { mileage })
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
