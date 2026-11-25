import { type Request, type Response, type NextFunction } from "express";
import * as ordersService from "../services/orders.service";
import { type Order, type ApiResponse, type CreateOrder } from "@app/shared";

export const createOrder = async (
	req: Request,
	res: Response<ApiResponse<Order>>,
	_next: NextFunction,
) => {
	const body: CreateOrder = req.body;

	const order = await ordersService.createOrder(body);

	return res.json({
		success: true,
		message: "Lyckades att skapa order",
		data: order,
	});
};

export const confirmOrder = async (
	req: Request<{ id: string }>,
	res: Response<ApiResponse<Order>>,
	_next: NextFunction,
) => {
	const { sessionId } = req.body;

	const order = await ordersService.confirmOrder(req.params.id, sessionId);

	return res.json({
		success: true,
		message: "Betalning bekräftad",
		data: order,
	});
};
