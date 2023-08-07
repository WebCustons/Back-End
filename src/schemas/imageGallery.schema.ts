import { z } from "zod"

export const imageGallerySchema = z.object({
  id: z.number(),
  image: z.string(),
  advert_id: z.number(),
})

export const imageGallerySchemaRequest = imageGallerySchema.omit({
  id: true,
  advert_id: true,
})
