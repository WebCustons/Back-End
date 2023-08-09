import { Router } from "express"
import { createUsersController } from "../controllers/User/createUsers.controller";
import { schemaValidator } from "../middlewares/schema.middlewares";
import { userSchemaRequest } from "../schemas/user.schema";

export const userRoutes = Router()

userRoutes.post("/", schemaValidator(userSchemaRequest), createUsersController)
userRoutes.get("/")
userRoutes.get("/all")
userRoutes.patch("/")
userRoutes.delete("/")
