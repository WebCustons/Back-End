import { z } from "zod"

const addressSchema = z.object({
  id: z.number(),
  cep: z.number(),
  state: z.string(),
  city: z.string(),
  road: z.string(),
  number: z.number(),
  complement: z.string(),
  user_id: z.number(),
})

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: "Cpf deve estar no formato 123.456.789-00",
  }),
  phone: z.number(),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Data deve estar no formato YYYY-MM-DD",
  }),
  description: z.string(),
  password: z.string(),
  type_user: z.enum(["costumer", "seller", "admin"]),
  address: addressSchema,
})

export const userSchemaRequest = userSchema
  .omit({ id: true })
  .extend({
    address: addressSchema.omit({ id: true, user_id:true }),
  });

export const userSchemaResponse = userSchema.omit({ password: true })

export const userSchemaRequestUpdate = userSchemaRequest.partial()
