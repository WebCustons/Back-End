import { z } from "zod";
import { advertSchema, advertSchemaGallery, advertSchemaRequest, advertSchemaResponse } from "./advert.schema";

export const imageGallerySchema = z.object({
  id: z.number(),
  image: z.string(),
  adverts: advertSchema.omit({ images: true, user: true }),
});

export const imageGallerySchemaRequest = imageGallerySchema.omit({ id: true, adverts: true });

export const imageGallerySchemaResponse = imageGallerySchema

export const imageGallerySchemaAdvert = z.object({
  id: z.number(),
  image: z.string(),
});