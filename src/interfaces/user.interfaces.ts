import { z } from "zod"
import {
  userSchema,
  userSchemaRequest,
  userSchemaRequestUpdate,
  userSchemaResponse,
} from "../schemas/user.schema"

export type IUser = z.infer<typeof userSchema>

export type IUserRequest = z.infer<typeof userSchemaRequest>

export type IUserResponse = z.infer<typeof userSchemaResponse>

export type IUserResponseUpdate = z.infer<typeof userSchemaRequestUpdate>
