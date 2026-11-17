// apps/backend/src/testPopulate.ts
import dotenv from "dotenv";
import mongoose from "mongoose";
import "../models/ingredient.model"; // Registrerar "Ingredient"-modellen hos Mongoose
import Product from "../models/product.model";

dotenv.config();

async function testPopulate() {
	const connectionString = process.env.CONNECTION_STRING;

	if (!connectionString) {
		throw new Error("CONNECTION_STRING saknas i .env");
	}

	try {
		await mongoose.connect(connectionString);
		console.log("Ansluten till MongoDB...\n");

		// Hämtar alla produkter i menyordning och populerar alla referenser
		const products = await Product.find({})
			.sort({ sortOrder: 1 })
			.populate("ingredients")
			.populate("condiments")
			.populate("extras")
			.lean();

		if (products.length === 0) {
			console.log("Hittade inga produkter! Har du kört seedProducts.ts?");
			return;
		}

		console.log(`Hittade ${products.length} produkter:\n`);
		// JSON.stringify gör att hela objekten skrivs ut istället för "[Object]"
		console.log(JSON.stringify(products, null, 2));
	} catch (error) {
		console.error("Fel vid populate:", error);
	} finally {
		await mongoose.disconnect();
		console.log("\nFrånkopplad från MongoDB.");
	}
}

testPopulate();
