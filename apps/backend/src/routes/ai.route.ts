import { Router } from "express";
import * as aiController from "../controllers/ai.controller";

const router = Router();

router.post("/", aiController.chatWithAI);

export default router;
