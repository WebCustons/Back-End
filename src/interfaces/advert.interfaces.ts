import { z } from "zod"
import {
  advertSchema,
  advertSchemaRequest,
  advertSchemaRequestUpdate,
} from "../schemas/advert.schema"

export type IAdvert = z.infer<typeof advertSchema>

export type IAdvertRequest = z.infer<typeof advertSchemaRequest>

export type IAdvertRequestUpdate = z.infer<typeof advertSchemaRequestUpdate>
