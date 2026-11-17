import { Router } from "express";
import * as menuController from "../controllers/menu.controller";


const router = Router();

router.get("/", menuController.getMenu)

export default router;