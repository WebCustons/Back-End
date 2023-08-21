import { string, z } from "zod"
import { userSchema } from "./user.schema"

export const commentSchema = z.object({
  id: z.number(),
  comment: z.string(),
  user: z.number(),
  advert: z.number(),
  created_at: z.date(),
})

export const commentSchemaResponse = commentSchema.omit({
  advert:true
}).extend({
  user:userSchema.pick({
    name:true
  })
})

export const commentSchemaRequest = commentSchema.pick({comment:true});

