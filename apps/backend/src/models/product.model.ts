import { model, Schema, Types } from "mongoose";
import { PRODUCT_CATEGORIES, type Product } from "@app/shared";

type MongooseIProduct = Omit<
	Product,
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
	image: {
		type: String,
		required: true,
		default:
			"https://res.cloudinary.com/moiyaaa9/image/upload/v1795005821/produktbild_saknas.jpg",
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
