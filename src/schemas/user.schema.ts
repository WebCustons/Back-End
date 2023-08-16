import { z } from "zod";
import { advertSchema, advertSchemaResponse } from "./advert.schema";
import { commentSchemaRequest } from "./comment.schema";
import { FuelType } from "../entities/adverts.entities";
import { imageGallerySchemaAdvert } from "./imageGallery.schema";

const addressSchema = z.object({
  id: z.number(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  road: z.string(),
  number: z.string(),
  complement: z.string(),
  user: z.number(),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: "Cpf deve estar no formato 123.456.789-00",
  }),
  phone: z.string().max(12),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Data deve estar no formato YYYY-MM-DD",
  }),
  description: z.string(),
  password: z.string(),
  type_user: z.enum(["customer", "seller", "admin"]),
  address: addressSchema,
});

export const userSchemaRequest = userSchema.omit({ id: true }).extend({
  address: addressSchema.omit({ id: true, user: true }),
});

export const userSchemaResponse = userSchema.omit({ password: true }).extend({
  address: addressSchema.omit({ user: true }),
});

export const userSchemaRequestUpdate = userSchemaRequest
  .extend({
    address: addressSchema.omit({ id: true, user: true }).partial(),
  })
  .partial();

export const allUsersSchema = userSchemaResponse.array();


const advertsEssentials = z.object({
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
})

export const userAdvertsSchema = userSchema.omit({address:true, password:true}).extend({adverts: advertsEssentials.array()})
