import { z } from "zod";
import { advertSchemaResponse } from "./advert.schema";

export const imageGallerySchema = z.object({
  id: z.number(),
  image: z.string(),
  advert: advertSchemaResponse,
});

export const imageGallerySchemaRequest = imageGallerySchema.omit({
  id: true,
  advert: true,
});
export const imageGallerySchemaResponse = imageGallerySchema

export const imageGallerySchemaAdvert = z.object({
  id: z.number(),
  image: z.string(),
});