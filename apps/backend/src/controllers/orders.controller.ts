import { type Request, type Response, type NextFunction } from "express";
import * as ordersService from "../services/orders.service";
import { type OrderStatus, type PaymentStatus} from "@app/shared"
import {
	type Order,
	type ApiResponse,
	type CreateOrder,
	ChangeOrderStatus,
} from "@app/shared";

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

	const status = req.query.status as OrderStatus;

	const paymentStatus = req.query.paymentStatus as PaymentStatus;

	const orders = await ordersService.getOrders(status, paymentStatus)

	return res.json({
		success: true,
		message: "Orderlista hämtad",
		data: orders
	})
}
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

export const changeOrderStatus = async (
	req: Request,
	res: Response<ApiResponse<Order>>,
	_next: NextFunction,
) => {
	const { orderStatus } = req.body;
	const { id } = req.params as { id: string };

	const order = await ordersService.changeOrderStatus(id, orderStatus);

	return res.json({
		success: true,
		message: `Order status på order ${id} har satts till ${orderStatus}`,
		data: order,
	});
};
