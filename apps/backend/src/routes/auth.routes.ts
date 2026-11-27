import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { requireAdmin } from "../middlewares/authVerifyAdmin.middleware";
import { zodValidate } from "../middlewares/validateBody.middleware";
import { createUserSchema, loginUserSchema } from "@app/shared";


const router = Router();

router.post("/register", requireAdmin, zodValidate(createUserSchema), authController.registerUser);

router.post("/login", zodValidate(loginUserSchema), authController.loginUser)

export default router;