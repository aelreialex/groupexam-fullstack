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
		message: "Lyckat anrop",
		data: order,
	});
};
