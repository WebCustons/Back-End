import { Router } from "express"
import { userSchemaRequest } from "../schemas/user.schema"
import { userExists } from './../middlewares/users.middlewares';
import { createUsersController } from './../controllers/User/createUsers.controller';
import { listOneUsersController } from './../controllers/User/listOneUsers.controller';
import { listAllUsersController } from './../controllers/User/listAllUsers.controller';
import { updateUserController } from './../controllers/User/updateUsers.controller';
import { deleteUserController } from './../controllers/User/deleteUsers.controller';
import { schemaValidator } from "../middlewares/schema.middlewares";
import { isAdmin, verifyAuthToken, isOwner, isOwnerOrAdmin } from '../middlewares/authorization.middleware';
export const userRoutes = Router()

userRoutes.post("/", schemaValidator(userSchemaRequest), userExists, createUsersController)
userRoutes.get("/", verifyAuthToken, listOneUsersController)
userRoutes.get("/all", verifyAuthToken, isAdmin, listAllUsersController)
userRoutes.patch("/", verifyAuthToken, isOwner, userExists, updateUserController)
userRoutes.delete("/", verifyAuthToken, isOwnerOrAdmin, deleteUserController)
