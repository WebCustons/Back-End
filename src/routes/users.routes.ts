import { Router } from "express"
import { createUsersController } from "../controllers/User/createUsers.controller";
import { listAllUsersController } from "../controllers/User/listAllUsers.controller";
import { listOneUsersController } from "../controllers/User/listOneUsers.controller";
import { schemaValidator } from "../middlewares/schema.middlewares";
import { userSchemaRequest } from "../schemas/user.schema";
import { updateUserController } from './../controllers/User/updateUsers.controller';
import { deleteUserController } from './../controllers/User/deleteUsers.controller';
import { isAdmin, isOwnerOrAdmin, verifyAuthToken } from "../middlewares/authorization.Middleware";
import { isOwner } from './../middlewares/authorization.Middleware';

export const userRoutes = Router()

userRoutes.post("/", schemaValidator(userSchemaRequest), createUsersController)
userRoutes.get("/", verifyAuthToken, listOneUsersController)
userRoutes.get("/all", verifyAuthToken, isAdmin, listAllUsersController)
userRoutes.patch("/", verifyAuthToken, isOwner, updateUserController)
userRoutes.delete("/", verifyAuthToken, isOwnerOrAdmin, deleteUserController)
