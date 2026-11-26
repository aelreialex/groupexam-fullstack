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

export const getOrders = async ( req: Request, res: Response,  _next: NextFunction ) => {

	const status = req.query.status as string;

	const paymentStatus = req.query.paymentStatus as string;

	const orders = await ordersService.getOrders(status, paymentStatus)

	return res.json({
		success: true,
		message: "Orderlista hämtad",
		data: orders
	})
}