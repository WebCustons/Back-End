import { z } from "zod";
import { advertSchemaResponse } from "./advert.schema";

export const imageGallerySchema = z.object({
  id: z.number(),
  image: z.string(),
  advert: advertSchemaResponse.omit({
    user: true,
  }),
});

export const imageGallerySchemaRequest = imageGallerySchema.omit({
  id: true,
  advert_id: true,
});
