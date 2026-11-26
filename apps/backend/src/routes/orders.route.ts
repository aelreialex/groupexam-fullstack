import { Router } from "express";
import * as ordersController from "../controllers/orders.controller";
import { zodValidate } from "../middlewares/validateBody.middleware";
import { createOrderSchema } from "@app/shared";

const router = Router();

router.post("/", zodValidate(createOrderSchema), ordersController.createOrder);

router.get("/", ordersController.getOrders);

export default router;
