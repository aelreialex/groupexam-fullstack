import { Router } from "express";
import * as ordersController from "../controllers/orders.controller";
import { zodValidate } from "../middlewares/validateBody.middleware";
import { confirmOrderSchema, createOrderSchema } from "@app/shared";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", zodValidate(createOrderSchema), ordersController.createOrder);
router.patch(
	"/:id/confirm",
	zodValidate(confirmOrderSchema),
	ordersController.confirmOrder,
);

router.get("/", requireAuth ,ordersController.getOrders);

export default router;
