import { Router } from "express";
import { sendResetEmailPasswordController } from "../controllers/User/sendEmailPassword.controller";
import { resetPasswordController } from "../controllers/User/resetPassword.controller";

export const sendRoutes = Router();
sendRoutes.post("/", sendResetEmailPasswordController);
sendRoutes.patch("/:token", resetPasswordController);
