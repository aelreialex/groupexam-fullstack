// apps/backend/src/seed.ts
import dotenv from "dotenv";
import mongoose from "mongoose";
import { type IIngredient } from "@app/shared";
import IngredientModel from "../models/ingredient.model";

dotenv.config();

const ingredients: Omit<IIngredient, "_id">[] = [
	// --- BASER (base) ---
	{
		name: "Korvbröd",
		role: "base",
		price: 10,
		allergens: ["gluten"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Briochebröd",
		role: "base",
		price: 15,
		allergens: ["gluten", "lactose", "egg"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Tunnbröd",
		role: "base",
		price: 18,
		allergens: ["gluten"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Glutenfritt korvbröd",
		role: "base",
		price: 15,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Potatismos",
		role: "base",
		price: 25,
		allergens: ["lactose"],
		isCustomizable: false, // Används till mosbricka / halv & hel special
		inStock: true,
	},
	{
		name: "Pommes frites",
		role: "base",
		price: 25,
		allergens: [],
		isCustomizable: false, // Används till korv & pommes
		inStock: true,
	},

	// --- KORVAR (sausage) ---
	{
		name: "Kokt korv",
		role: "sausage",
		price: 15,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Grillad korv",
		role: "sausage",
		price: 18,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Chorizo",
		role: "sausage",
		price: 25,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Ost- och baconkorv",
		role: "sausage",
		price: 28,
		allergens: ["lactose"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Bratwurst",
		role: "sausage",
		price: 26,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Vegokorv",
		role: "sausage",
		price: 22,
		allergens: ["gluten"],
		isCustomizable: true,
		inStock: true,
	},

	// --- SÅSER & RÖROR (condiment) ---
	{
		name: "Ketchup",
		role: "condiment",
		price: 0,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Senap",
		role: "condiment",
		price: 0,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Stark senap",
		role: "condiment",
		price: 0,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Bostongurka",
		role: "condiment",
		price: 5,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Räksallad",
		role: "condiment",
		price: 15,
		allergens: ["egg", "lactose"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Västkustsallad",
		role: "condiment",
		price: 15,
		allergens: ["egg", "lactose"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Remouladsås",
		role: "condiment",
		price: 8,
		allergens: ["egg"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Vitlöksdressing",
		role: "condiment",
		price: 8,
		allergens: ["egg", "lactose"],
		isCustomizable: true,
		inStock: true,
	},

	// --- TOPPINGS (topping) ---
	{
		name: "Rostad lök",
		role: "topping",
		price: 5,
		allergens: ["gluten"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Finhackad rå lök",
		role: "topping",
		price: 5,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Surkål",
		role: "topping",
		price: 10,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Jalapeños",
		role: "topping",
		price: 8,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Knaperstekt bacon",
		role: "topping",
		price: 12,
		allergens: [],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Smält cheddarost",
		role: "topping",
		price: 10,
		allergens: ["lactose"],
		isCustomizable: true,
		inStock: true,
	},
	{
		name: "Riven ost",
		role: "topping",
		price: 8,
		allergens: ["lactose"],
		isCustomizable: true,
		inStock: false, // Bra för att testa "slut i lager" i frontend
	},
];

async function seedIngredients() {
	const connectionString = process.env.CONNECTION_STRING;

	if (!connectionString) {
		throw new Error("CONNECTION_STRING saknas i .env");
	}

	try {
		await mongoose.connect(connectionString);
		console.log("Ansluten till MongoDB...");

		// Rensa befintliga ingredienser så du kan köra skriptet flera gånger utan dubbletter
		await IngredientModel.deleteMany({});
		console.log("Rensade gamla ingredienser.");

		const created = await IngredientModel.insertMany(ingredients);
		console.log(
			`Seedade ${created.length} ingredienser för Nisses Korvmoj!`,
		);
	} catch (error) {
		console.error("Fel vid seeding:", error);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
		console.log("Frånkopplad från MongoDB.");
	}
}

seedIngredients();
