import { model, Schema } from "mongoose";
import {
	INGREDIENT_ROLES,
	INGREDIENT_ALLERGENS,
	type Ingredient,
} from "@app/shared";

const ingredientSchema = new Schema<Omit<Ingredient, "_id">>({
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

const IngredientModel = model("Ingredient", ingredientSchema);
export default IngredientModel;
