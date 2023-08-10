import { z } from "zod";
import { FuelType } from "../entities/adverts.entities";
import { userSchema  } from './user.schema';

export const advertSchema = z.object({
  id: z.number(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int().positive(),
  fuel: z.enum([FuelType.GASOLINA, FuelType.ETANOL]),
  mileage: z.number().int().positive(),
  color: z.string(),
  table_fipe: z.boolean(),
  price: z.number().positive(),
  description: z.string(),
  cover_image: z.string(),
  published: z.boolean(),
  Users: userSchema.omit({ address: true, password: true }),
});


export const advertSchemaRequest = advertSchema.omit({ id: true, Users: true });

export const advertSchemaRequestUpdate = advertSchemaRequest.partial();

export const advertSchemaResponse = advertSchema

export const allAdvertSchema = advertSchema.array()
