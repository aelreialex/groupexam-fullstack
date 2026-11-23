import ProductModel from "../models/product.model";
import IngredientModel from "../models/ingredient.model";
import { type CreateOrder } from "@app/shared";

export const createOrder = async (body: CreateOrder) => {
	// create cart snapshot to validate all id's, check everything is in stock, set prices and return the finished cart array
	// initiate stripe session
	// write order to db
	// return order to frontend with the stripe checkout url
};

export const createCartSnapshot = async (body: CreateOrder) => {
	const cart = body.cart.filter((p) => p.type === "product");

	// put all unique id's in to arrays for easy batch db call
	// set only allows unique values, ...new makes it in to a normal array again
	const productIds = [...new Set(cart.map((i) => i.productId))];
	// using flatMap to remove nested arrays in to a clean array of strings
	const ingredientIds = [
		...new Set(cart.flatMap((i) => [...i.extras, ...i.condiments])),
	];

	// making all the db calls for the unique products and ingredients in a batch using Promise.all instead of sequntially which is way faster
	const [products, ingredients] = await Promise.all([
		ProductModel.find({ _id: { $in: productIds } }).lean(),
		IngredientModel.find({ _id: { $in: ingredientIds } }).lean(),
	]);

	// using map for instant lookups with .get() instead of .find()
	// ["id", {the full object without id}],[...]
	const productMap = new Map(products.map((p) => [p._id.toString(), p]));
	const ingredientMap = new Map(ingredients.map((i) => [i._id, i]));

	let totalOrderPrice = 0;

	// validation and snapshot creation
	const cartSnapshot = cart.map((item) => {
		const product = productMap.get(item.productId);

		if (!product) {
			throw {
				status: 404,
				message: `Produkt me ID: ${item.productId} hittades inte`,
			};
		} else if (!product.onMenu) {
			throw {
				status: 404,
				message: `${product.name} finns inte i lager`,
			};
		}
	});
};
