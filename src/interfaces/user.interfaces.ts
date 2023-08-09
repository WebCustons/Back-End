import { z } from "zod"
import {
  userSchema,
  userSchemaRequest,
  userSchemaRequestUpdate,
  userSchemaResponse,
} from "../schemas/user.schema"

export type TUser = z.infer<typeof userSchema>

export type TUserRequest = z.infer<typeof userSchemaRequest>

export type TUserResponse = z.infer<typeof userSchemaResponse>

export type TUserRequestUpdate = z.infer<typeof userSchemaRequestUpdate>
