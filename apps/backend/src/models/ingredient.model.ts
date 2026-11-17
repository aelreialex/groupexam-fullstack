import { model, Schema } from "mongoose";
import {
	INGREDIENT_ROLES,
	INGREDIENT_ALLERGENS,
	type IIngredient,
} from "@app/shared";

const ingredientSchema = new Schema<Omit<IIngredient, "_id">>({
	name: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: INGREDIENT_ROLES,
		default: "topping",
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	allergens: {
		type: [
			{
				type: String,
				enum: INGREDIENT_ALLERGENS,
			},
		],
		default: [],
		required: true,
	},
	isCustomizable: {
		type: Boolean,
		required: true,
	},
	inStock: {
		type: Boolean,
		required: true,
	},
});

const Ingredient = model("Ingredient", ingredientSchema);
export default Ingredient;
