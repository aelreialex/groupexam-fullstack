import { z } from "zod";

export const ORDER_STATUSES = [
	"pending",
	"preparing",
	"ready",
	"completed",
	"cancelled",
] as const;

export const PAYMENT_STATUSES = [
	"unpaid",
	"paid",
	"failed",
	"refunded",
] as const;

export const orderStatusSchema = z.enum(ORDER_STATUSES);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const paymentStatusSchema = z.enum(PAYMENT_STATUSES);
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;

export const orderItemSchema = z.object({
	type: z.literal("product", "Ogiltig produkttyp"),
	productId: z
		.string("Produkt-ID måste vara en textsträng")
		.min(1, "Produkt-ID krävs"),
	quantity: z
		.number("Antal måste vara ett nummer")
		.int("Antal måste vara ett heltal")
		.min(1, "Minst 1 vara krävs")
		.max(10, "Max 10 av samma vara per beställning")
		.default(1),
	extras: z
		.array(
			z.string("Ogiltigt ID för tillval"),
			"Tillval måste vara en lista",
		)
		.max(3, "Max 3 tillval per vara")
		.default([]),
	condiments: z
		.array(z.string("Ogiltigt ID för sås"), "Såser måste vara en lista")
		.max(2, "Max 2 såser per vara")
		.default([]),
});

// export const customOrderItemSchema later with type "custom" for build own hotdog feature

export const createOrderSchema = z.object({
	// customerName: z.string(), // both comes from stripe instead
	// customerEmail: z.email("Invalid email format").optional(),
	// notes: z.string().trim().max(300).optional(),
	cart: z
		.array(orderItemSchema, "Kundvagnen måste vara en lista")
		.min(1, "Beställningen måste innehålla minst 1 vara"),
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
	basePrice: z.number().min(0),
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
	customerName: z.string().optional(),
	customerEmail: z.email().optional(),
	price: z.number().int().min(0),
	cart: z.array(itemSnapshotSchema).min(1),
	status: orderStatusSchema,
	paymentStatus: paymentStatusSchema,
	stripeSessionId: z.string(),
	stripeCheckoutURL: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
export type ItemSnapshot = z.infer<typeof itemSnapshotSchema>;
export type IngredientSnapshot = z.infer<typeof ingredientSnapshotSchema>;
