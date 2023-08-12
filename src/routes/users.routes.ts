import { Router } from "express"
import { userSchemaRequest, userSchemaRequestUpdate } from "../schemas/user.schema"
import { isOwnerOrAdminUser, userExistsbyId, userExistsCreate } from './../middlewares/users.middlewares';
import { createUsersController } from './../controllers/User/createUsers.controller';
import { listOneUsersController } from './../controllers/User/listOneUsers.controller';
import { listAllUsersController } from './../controllers/User/listAllUsers.controller';
import { updateUserController } from './../controllers/User/updateUsers.controller';
import { deleteUserController } from './../controllers/User/deleteUsers.controller';
import { schemaValidator } from "../middlewares/schema.middlewares";
import { verifyAuthToken, isAdmin } from "../middlewares/authorization.middleware"

export const userRoutes = Router()

userRoutes.post("/", schemaValidator(userSchemaRequest), userExistsCreate, createUsersController)
userRoutes.get("/:id", verifyAuthToken, userExistsbyId, isOwnerOrAdminUser, listOneUsersController)
userRoutes.get("/all", verifyAuthToken, isAdmin, listAllUsersController)
userRoutes.patch("/", verifyAuthToken, schemaValidator(userSchemaRequestUpdate), userExistsCreate, updateUserController)
userRoutes.delete("/:id", verifyAuthToken, userExistsbyId, isOwnerOrAdminUser, deleteUserController)
