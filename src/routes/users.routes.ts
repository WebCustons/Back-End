import { Router } from "express"
import { createUsersController } from "../controllers/User/createUsers.controller";
import { schemaValidator } from "../middlewares/schema.middlewares";
import { userSchemaRequest } from "../schemas/user.schema";

export const userRoutes = Router()

userRoutes.post("/", schemaValidator(userSchemaRequest), createUsersController)
userRoutes.get("/", verifyAuthToken, listOneUsersController)
userRoutes.get("/all", verifyAuthToken, isAdmin, listAllUsersController)
userRoutes.patch("/", verifyAuthToken, isOwner, updateUserController)
userRoutes.delete("/", verifyAuthToken, isOwnerOrAdmin, deleteUserController)
