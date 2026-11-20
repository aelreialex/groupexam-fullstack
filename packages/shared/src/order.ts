import { z } from "zod";

export const ORDER_STATUSES = [
	"pending",
	"preparing",
	"ready",
	"completed",
	"cancelled",
] as const;

export const PAYMENT_STATUSES = ["unpaid", "paid", "failed", "refunded"];

export const orderStatusSchema = z.enum(ORDER_STATUSES);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const paymentStatusSchema = z.enum(PAYMENT_STATUSES);
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;

export const createOrderSchema = z.object({
	customerName: z.string(),
	cart: z.array(),
});
