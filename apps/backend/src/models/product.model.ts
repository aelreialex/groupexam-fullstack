import { model, Schema, Types } from "mongoose";
import { PRODUCT_CATEGORIES, type IProduct } from "@app/shared";

type MongooseIProduct = Omit<
	IProduct,
	"_id" | "ingredients" | "extras" | "condiments"
> & {
	ingredients: Types.ObjectId[];
	extras: Types.ObjectId[];
	condiments: Types.ObjectId[];
};

const productSchema = new Schema<MongooseIProduct>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	price: {
		type: Number,
		required: true,
	},
	nisseQuote: {
		type: String,
		required: false,
	},
	category: {
		type: String,
		enum: PRODUCT_CATEGORIES,
		default: "meal",
		required: true,
	},
	ingredients: [
		{
			type: Schema.Types.ObjectId,
			ref: "Ingredient",
			required: true,
		},
	],
	extras: [
		{
			type: Schema.Types.ObjectId,
			ref: "Ingredient",
			required: false,
		},
	],
	condiments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Ingredient",
			required: false,
		},
	],
	onMenu: {
		type: Boolean,
		required: true,
	},
	isLunch: {
		type: Boolean,
		required: true,
	},
	inStock: {
		type: Boolean,
		required: true,
	},
	sortOrder: {
		type: Number,
		required: true,
	},
});

const Product = model("Product", productSchema);
export default Product;
