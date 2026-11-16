import { z } from "zod";

export const INGREDIENT_ROLES = [
	"base",
	"sausage",
	"condiment",
	"topping",
] as const;

export const INGREDIENT_ALLERGENS = ["gluten", "lactose", "egg"] as const;

export const ingredientRoleSchema = z.enum(INGREDIENT_ROLES);
export type IIngredientRole = z.infer<typeof ingredientRoleSchema>;
export const ingredientAllergensSchema = z.enum(INGREDIENT_ALLERGENS);
export type IIngredientAllergens = z.infer<typeof ingredientAllergensSchema>;

export const createIngredientSchema = z.object({
	_id: z.string(),
	name: z.string().min(2, "Name is required"),
	role: ingredientRoleSchema.default("topping"),
	price: z.number().int().min(0).default(0),
	allergens: z.array(ingredientAllergensSchema).default([]),
	isCustomizable: z.boolean().default(false),
	inStock: z.boolean().default(true),
});

export type IIngredient = z.infer<typeof createIngredientSchema>;
