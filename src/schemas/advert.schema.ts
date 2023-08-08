import { z } from "zod";

export const advertSchema = z.object({
  id: z.number(),
  brand: z.string(),
  model: z.string(),
  doors: z.number().int(),
  year: z.string().regex(/^\d{4}$/),
  fuel: z.enum(["gasolina", "etanol"]),
  mileage: z.number().int().positive(),
  color: z.string(),
  table_fipe: z.boolean(),
  price: z.number().positive(),
  description: z.string(),
  cover_image: z.string(),
  published: z.boolean(),
  user_id: z.number(),
});
export const allAdvertSchema = z
  .object({
    id: z.number(),
    brand: z.string(),
    model: z.string(),
    doors: z.number().int(),
    year: z.string().regex(/^\d{4}$/),
    fuel: z.enum(["gasolina", "etanol"]),
    mileage: z.number().int().positive(),
    color: z.string(),
    table_fipe: z.boolean(),
    price: z.number().positive(),
    description: z.string(),
    cover_image: z.string(),
    published: z.boolean(),
    user_id: z.number(),
  })
  .array();

export const advertSchemaRequest = advertSchema.omit({ id: true });

export const advertSchemaRequestUpdate = advertSchemaRequest.partial();
