import { z } from "zod"

export const commentSchema = z.object({
  id: z.number(),
  comment: z.string(),
  user_id: z.number(),
  advert_id: z.number(),
  create_at: z.string(),
})

export const commentSchemaRequest = commentSchema.omit({
  id: true,
  user_id: true,
  advert_id: true,
  create_at: true,
})
