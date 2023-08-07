import { z } from "zod"
import { commentSchema, commentSchemaRequest } from "../schemas/comment.schema"

export type IComment = z.infer<typeof commentSchema>

export type ICommentRequest = z.infer<typeof commentSchemaRequest>
