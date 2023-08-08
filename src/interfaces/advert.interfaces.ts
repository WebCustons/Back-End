import { z } from "zod";
import {
  advertSchema,
  advertSchemaRequest,
  advertSchemaRequestUpdate,
} from "../schemas/advert.schema";

export type TAdvert = z.infer<typeof advertSchema>;

export type TAdvertRequest = z.infer<typeof advertSchemaRequest>;

export type TAdvertRequestUpdate = z.infer<typeof advertSchemaRequestUpdate>;
