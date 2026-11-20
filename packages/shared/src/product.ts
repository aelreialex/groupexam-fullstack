import { z } from "zod";
import { createIngredientSchema } from "./ingredient";

export const PRODUCT_CATEGORIES = ["meal", "drink"] as const;

export const productCategorySchema = z.enum(PRODUCT_CATEGORIES);
export type ProductCategory = z.infer<typeof productCategorySchema>;

export const createProductSchema = z.object({
	_id: z.string(),
	price: z.number().int().min(0),
	name: z.string().min(2, "Name is required"),
	description: z
		.string()
		.min(1, "Description requires at least 1 character")
		.optional(),
	nisseQuote: z.string().min(5).optional(),
	image: z
		.string()
		.default(
			"https://res.cloudinary.com/moiyaaa9/image/upload/v1795005821/produktbild_saknas.jpg",
		),
	category: productCategorySchema.default("meal"),
	ingredients: z.array(createIngredientSchema).default([]),
	extras: z
		.array(createIngredientSchema.extend({ role: z.literal("topping") }))
		//.max(3)
		.default([]),
	condiments: z
		.array(createIngredientSchema.extend({ role: z.literal("condiment") }))
		//.max(2)
		.default([]),
	onMenu: z.boolean().default(true),
	isLunch: z.boolean().default(false),
	inStock: z.boolean().default(true),
	sortOrder: z.number().int().min(0),
});

export type Product = z.infer<typeof createProductSchema>;
