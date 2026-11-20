// apps/backend/src/fetchIngredients.ts
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import IngredientModel from "../models/ingredient.model";

dotenv.config();

async function fetchIngredientsAsJson() {
	const connectionString = process.env.CONNECTION_STRING;

	if (!connectionString) {
		throw new Error("CONNECTION_STRING saknas i .env");
	}

	try {
		await mongoose.connect(connectionString);
		console.log("Ansluten till MongoDB...");

		// .lean() returnerar rena JS-objekt och .select("-__v") tar bort Mongoose versionsfält
		const ingredients = await IngredientModel.find({})
			.select("-__v")
			.lean();

		const jsonOutput = JSON.stringify(ingredients, null, 2);

		// Skriv ut JSON i terminalen
		console.log(jsonOutput);

		// Spara till ingredients.json
		const outputPath = path.resolve(process.cwd(), "ingredients.json");
		await fs.writeFile(outputPath, jsonOutput, "utf-8");
		console.log(
			`Sparade ${ingredients.length} ingredienser till ${outputPath}`,
		);
	} catch (error) {
		console.error("Fel vid hämtning av ingredienser:", error);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
		console.log("Frånkopplad från MongoDB.");
	}
}

fetchIngredientsAsJson();
