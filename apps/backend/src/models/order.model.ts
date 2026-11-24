import { model, Schema } from "mongoose";
import {
	PAYMENT_STATUSES,
	ORDER_STATUSES,
	type Order,
	type ItemSnapshot,
	type IngredientSnapshot,
} from "@app/shared";

type MongooseOrder = Omit<Order, "_id" | "createdAt" | "updatedAt">;

const ingredientSnapshotSchema = new Schema<IngredientSnapshot>({
	ingredientId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

const itemSnapshotSchema = new Schema<ItemSnapshot>({
	type: {
		type: String,
		enum: ["product", "custom"],
		required: true,
	},
	productId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	basePrice: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	baseIngredients: [
		{
			type: ingredientSnapshotSchema,
			default: [],
		},
	],
	extras: [
		{
			type: ingredientSnapshotSchema,
			default: [],
		},
	],
	condiments: [
		{
			type: ingredientSnapshotSchema,
			default: [],
		},
	],
	itemPrice: {
		type: Number,
		required: true,
	},
	totalItemPrice: {
		type: Number,
		required: true,
	},
});

const orderSchema = new Schema<MongooseOrder>(
	{
		orderNumber: {
			type: Number,
			required: true,
		},
		customerName: {
			type: String,
			required: false,
		},
		customerEmail: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: true,
		},
		cart: [
			{
				type: itemSnapshotSchema,
				required: true,
			},
		],
		status: {
			type: String,
			enum: ORDER_STATUSES,
			default: "pending",
			required: true,
		},
		paymentStatus: {
			type: String,
			enum: PAYMENT_STATUSES,
			default: "unpaid",
			required: true,
		},
		stripeSessionId: {
			type: String,
			required: true,
		},
		stripeCheckoutURL: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const OrderModel = model("Order", orderSchema);
export default OrderModel;
