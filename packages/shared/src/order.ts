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

export const orderItemSchema = z.object({
	type: z.literal("product"),
	productId: z.string().min(1, "Product ID is required"),
	quantity: z.number().int().min(1).max(10).default(1),
	extras: z.array(z.string()).max(3).default([]),
	condiments: z.array(z.string()).max(2).default([]),
});

// export const customOrderItemSchema later with type "custom" for build own hotdog feature

export const createOrderSchema = z.object({
	customerName: z.string(),
	customerEmail: z.email("Invalid email format").optional(),
	// notes: z.string().trim().max(300).optional(),
	cart: z.array(orderItemSchema).min(1, "Order must have at least 1 item"),
});

export type CreateOrder = z.infer<typeof createOrderSchema>;

// snapshot of data at the time of purchase

export const ingredientSnapshotSchema = z.object({
	ingredientId: z.string(),
	name: z.string(),
	price: z.number().int().min(0),
});

export const itemSnapshotSchema = z.object({
	type: z.enum(["product", "custom"]),
	productId: z.string().optional(),
	name: z.string(),
	quantity: z.number().int().min(1),
	baseIngredients: z.array(ingredientSnapshotSchema).default([]),
	extras: z.array(ingredientSnapshotSchema).default([]),
	condiments: z.array(ingredientSnapshotSchema).default([]),
	itemPrice: z.number().int().min(0),
	totalItemPrice: z.number().int().min(0),
});

//db structure and response format
export const orderSchema = z.object({
	_id: z.string(),
	orderNumber: z.number().int().min(1),
	customerName: z.string(),
	customerEmail: z.email().optional(),
	// notes: z.string().max(300).optional(),
	price: z.number().int().min(0),
	cart: z.array(itemSnapshotSchema).min(1),
	status: ORDER_STATUSES,
	paymentStatus: PAYMENT_STATUSES,
	stripeSessionId: z.string(),
	stripeCheckoutURL: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
export type ItemSnapshot = z.infer<typeof itemSnapshotSchema>;
export type IngredientSnapshot = z.infer<typeof ingredientSnapshotSchema>;
