import ProductModel from "../models/product.model";
import IngredientModel from "../models/ingredient.model";
import { CounterModel } from "../models/counter.model";
import {
	OrderStatus,
	type CreateOrder,
	type ItemSnapshot,
	type Order,
} from "@app/shared";
import createError from "http-errors";
import Stripe from "stripe";
import { Types } from "mongoose";
import OrderModel from "../models/order.model";
import { type OrderStatus, type PaymentStatus} from "@app/shared"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createOrder = async (body: CreateOrder) => {
	// create cart snapshot to validate all id's, check everything is in stock, set prices and return the finished cart array
	const { cartSnapshot, totalOrderPrice } = await createCartSnapshot(body);

	const orderId = new Types.ObjectId();

	// initiate stripe session
	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		name_collection: {
			individual: {
				enabled: true,
			},
		},
		line_items: cartSnapshot.map((item) => ({
			quantity: item.quantity,
			price_data: {
				currency: "sek",
				unit_amount: item.itemPrice * 100,
				product_data: {
					name: item.name,
				},
			},
		})),
		metadata: {
			orderId: orderId.toString(),
		},
		success_url: `${process.env.FRONTEND_ADDRESS}/order/${orderId.toString()}?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.FRONTEND_ADDRESS}/checkout`,
	});

	if (!session.url) {
		throw createError(500, "Kunde inte skapa betalningssession");
	}

	// write order to db
	const orderNumber = await getNextOrderNumber();

	const order = await OrderModel.create({
		_id: orderId,
		orderNumber,
		price: totalOrderPrice,
		cart: cartSnapshot,
		status: "pending",
		paymentStatus: "unpaid",
		stripeSessionId: session.id,
		stripeCheckoutURL: session.url,
	});

	// return order to frontend with the stripe checkout url
	return formatOrder(order);
};

// might need to refactor for custom hotdog later and maybe split up the code in to functions for DRY and readability
// function to capture the exact history of the product/ingredients/price etc at the point of purchase
export const createCartSnapshot = async (body: CreateOrder) => {
	const cart = body.cart.filter((p) => p.type === "product");

	// put all unique id's in to arrays for easy db calls
	// set only allows unique values, wrapping it in [...new   ] makes it in to a normal array again
	const productIds = [...new Set(cart.map((i) => i.productId))];
	const products = await ProductModel.find({
		_id: { $in: productIds },
	}).lean();

	// using flatMap to remove nested arrays in to a clean array of strings
	const ingredientIds = [
		...new Set([
			...products.flatMap((p) =>
				p.ingredients.map((id) => id.toString()),
			),
			...cart.flatMap((i) => [...i.extras, ...i.condiments]),
		]),
	];

	const ingredients = await IngredientModel.find({
		_id: { $in: ingredientIds },
	}).lean();

	// using map for instant lookups with .get() instead of .find()
	// ["id", {the full object without id}],[...]
	const productMap = new Map(products.map((p) => [p._id.toString(), p]));
	const ingredientMap = new Map(
		ingredients.map((i) => [i._id.toString(), i]),
	);

	let totalOrderPrice = 0;

	// validation and snapshot creation
	const cartSnapshot: ItemSnapshot[] = cart.map((item) => {
		const product = productMap.get(item.productId);

		if (!product || !product.onMenu) {
			throw createError(
				404,
				`Produkt med ID: ${item.productId} hittades inte`,
			);
		}

		if (!product.inStock) {
			throw createError(404, `${product.name} finns inte i lager`);
		}

		const allowedExtraIds = new Set(
			product.extras.map((id) => id.toString()),
		);
		const allowedCondimentIds = new Set(
			product.condiments.map((id) => id.toString()),
		);

		// for some reason product could be undefined inside the map below even though I did the checks above, setting a new const for product fixed it
		const validProduct = product;

		const baseIngredientsSnapshot = validProduct.ingredients.map(
			(ingredientId) => {
				const ingredient = ingredientMap.get(ingredientId.toString());

				if (!ingredient) {
					throw createError(
						500,
						`Basingrediens saknas för ${validProduct.name}`,
					);
				}

				if (!ingredient.inStock) {
					throw createError(
						409,
						`${validProduct.name} är slut (${ingredient.name} saknas i lager)`,
					);
				}

				return {
					ingredientId: ingredient._id.toString(),
					name: ingredient.name,
					price: ingredient.price,
				};
			},
		);

		const extrasSnapshot = item.extras.map((extraId) => {
			const extra = ingredientMap.get(extraId);

			if (!extra || !allowedExtraIds.has(extraId)) {
				throw createError(
					400,
					`Ogiltigt tillval för ${validProduct.name}`,
				);
			}

			if (!extra.inStock) {
				throw createError(409, `${extra.name} är slut i lager`);
			}
			return {
				ingredientId: extra._id.toString(),
				name: extra.name,
				price: extra.price,
			};
		});

		const condiemntsSnapshot = item.condiments.map((condimentId) => {
			const condiment = ingredientMap.get(condimentId);

			if (!condiment || !allowedCondimentIds.has(condimentId)) {
				throw createError(400, `Ogiltig sås för ${validProduct.name}`);
			}
			if (!condiment.inStock) {
				throw createError(409, `${condiment.name} är slut i lager`);
			}

			return {
				ingredientId: condiment._id.toString(),
				name: condiment.name,
				price: condiment.price,
			};
		});

		//base ingredients already included in main price
		const addonsPrice = [...extrasSnapshot, ...condiemntsSnapshot].reduce(
			(sum, addon) => sum + addon.price,
			0,
		);

		const itemPrice = validProduct.price + addonsPrice;
		const totalItemPrice = itemPrice * item.quantity;

		totalOrderPrice += totalItemPrice;

		return {
			type: "product",
			productId: validProduct._id.toString(),
			name: validProduct.name,
			basePrice: validProduct.price,
			quantity: item.quantity,
			baseIngredients: baseIngredientsSnapshot,
			extras: extrasSnapshot,
			condiments: condiemntsSnapshot,
			itemPrice,
			totalItemPrice,
		};
	});

	return { cartSnapshot, totalOrderPrice };
};

// sequntially increases counter, resets each new day
export const getNextOrderNumber = async (): Promise<number> => {
	const today = new Date().toLocaleDateString("sv-SE");

	const counter = await CounterModel.findOneAndUpdate(
		{ _id: `orders-${today}` },
		//increases with 1
		{ $inc: { seq: 1 } },
		//returns the new and updated value
		{ returnDocument: "after", upsert: true },
	);

	return counter.seq;
};

// type OrderFilter = {
// 	status?: OrderStatus | { $in: OrderStatus[] };
// 	paymentStatus?: string;
// }

export const getOrders = async ( status?: OrderStatus, paymentStatus?: PaymentStatus ): Promise<{ success: boolean; orderslist: unknown[];}> => {
	const filter: {
		status?: { $in: OrderStatus[] };
		paymentStatus?: { $in: PaymentStatus[] };
	} = {};

	if (status) {
		const statusList = status.split(",").map((item) => item.trim()).filter(Boolean) as OrderStatus[];
	
		if(statusList.length > 0 ) {
			filter.status = { $in: statusList };
		}
	}

	if (paymentStatus) {
		const paymentList = paymentStatus.split(",").map((item) => item.trim()).filter(Boolean) as PaymentStatus[];

		if(paymentList.length > 0 ) {
			filter.paymentStatus = { $in: paymentList }
		}
	}

	const orders = await OrderModel.find(filter);

	return {
		success: true,
		orderslist: orders,
	};
};


export const confirmOrder = async (
	orderId: string,
	sessionId: string,
): Promise<Order> => {
	// fetch order and make some basic checks
	const order = await OrderModel.findById(orderId);

	if (!order) {
		throw createError(404, "Order kunde inte hittas");
	}
	if (order.paymentStatus === "paid") {
		return formatOrder(order);
	}

	// fetch session and make some basic checks
	const session = await stripe.checkout.sessions.retrieve(sessionId);

	if (session.payment_status !== "paid") {
		throw createError(400, "Betalningen är inte genomförd");
	}

	if (session.metadata?.orderId !== order._id.toString()) {
		throw createError(400, "Ogiltlig betalningssession för denna order");
	}

	// update order
	order.paymentStatus = "paid";
	order.customerName = session.customer_details?.name || "Gäst";
	order.customerEmail = session.customer_details?.email || undefined;

	await order.save();

	return formatOrder(order);
};

export const changeOrderStatus = async (
	orderId: string,
	orderStatus: OrderStatus,
): Promise<Order> => {
	const order = await OrderModel.findById(orderId);

	if (!order) {
		throw createError(404, "Order kunde inte hittas");
	}

	order.status = orderStatus;

	await order.save();

	return formatOrder(order);
};

type OrderDocument = InstanceType<typeof OrderModel>;

const formatOrder = (order: OrderDocument): Order => {
	const { __v, ...cleanOrder } = order.toJSON();
	return cleanOrder as unknown as Order;
};
