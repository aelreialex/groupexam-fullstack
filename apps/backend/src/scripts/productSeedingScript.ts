// apps/backend/src/seedProducts.ts
import dotenv from "dotenv";
import mongoose, { Types } from "mongoose";
import Product from "../models/product.model";

dotenv.config();

// Exakta ID:n från din ingredients-tabell i MongoDB, grupperade efter role
const ING = {
	// --- BASER (role: "base") -> ingredients ---
	korvbrod: new Types.ObjectId("6afaf5766263f8da9d8010eb"),
	briochebrod: new Types.ObjectId("6afaf5766263f8da9d8010ec"),
	tunnbrod: new Types.ObjectId("6afaf5766263f8da9d8010ed"),
	glutenfrittBrod: new Types.ObjectId("6afaf5766263f8da9d8010ee"),
	potatismos: new Types.ObjectId("6afaf5766263f8da9d8010ef"),
	pommes: new Types.ObjectId("6afaf5766263f8da9d8010f0"),

	// --- KORVAR (role: "sausage") -> ingredients ---
	koktKorv: new Types.ObjectId("6afaf5766263f8da9d8010f1"),
	grilladKorv: new Types.ObjectId("6afaf5766263f8da9d8010f2"),
	chorizo: new Types.ObjectId("6afaf5766263f8da9d8010f3"),
	ostBaconKorv: new Types.ObjectId("6afaf5766263f8da9d8010f4"),
	bratwurst: new Types.ObjectId("6afaf5766263f8da9d8010f5"),
	vegokorv: new Types.ObjectId("6afaf5766263f8da9d8010f6"),

	// --- SÅSER & DRESSINGAR (role: "condiment") -> condiments ---
	ketchup: new Types.ObjectId("6afaf5766263f8da9d8010f7"),
	senap: new Types.ObjectId("6afaf5766263f8da9d8010f8"),
	starkSenap: new Types.ObjectId("6afaf5766263f8da9d8010f9"),
	remouladsas: new Types.ObjectId("6afaf5766263f8da9d8010fd"),
	vitloksdressing: new Types.ObjectId("6afaf5766263f8da9d8010fe"),

	// --- TOPPINGS & RÖROR (role: "topping") -> extras ---
	bostongurka: new Types.ObjectId("6afaf5766263f8da9d8010fa"),
	raksallad: new Types.ObjectId("6afaf5766263f8da9d8010fb"),
	vastkustsallad: new Types.ObjectId("6afaf5766263f8da9d8010fc"),
	rostadLok: new Types.ObjectId("6afaf5766263f8da9d8010ff"),
	raLok: new Types.ObjectId("6afaf5766263f8da9d801100"),
	surkal: new Types.ObjectId("6afaf5766263f8da9d801101"),
	jalapenos: new Types.ObjectId("6afaf5766263f8da9d801102"),
	bacon: new Types.ObjectId("6afaf5766263f8da9d801103"),
	cheddar: new Types.ObjectId("6afaf5766263f8da9d801104"),
	rivenOst: new Types.ObjectId("6afaf5766263f8da9d801105"),
};

const products = [
	// ================= RÄTTER (10 st) =================
	{
		name: "Kokt med bröd",
		description:
			"Klassisk kokt varmkorv i mjukt korvbröd med ketchup och senap.",
		price: 25,
		nisseQuote: "Enkel, ärlig och klar på tio sekunder – precis som förr!",
		category: "meal" as const,
		ingredients: [ING.korvbrod, ING.koktKorv],
		condiments: [ING.ketchup, ING.senap],
		extras: [],
		onMenu: true,
		isLunch: false,
		inStock: true,
		sortOrder: 1,
	},
	{
		name: "Grillad med bröd",
		description:
			"Nystekt grillkorv i korvbröd med ketchup, senap och krispig rostad lök.",
		price: 30,
		nisseQuote: "Lite mer yta, lite mer kärlek.",
		category: "meal" as const,
		ingredients: [ING.korvbrod, ING.grilladKorv],
		condiments: [ING.ketchup, ING.senap],
		extras: [ING.rostadLok],
		onMenu: true,
		isLunch: false,
		inStock: true,
		sortOrder: 2,
	},
	{
		name: "Halv special",
		description:
			"En grillad korv i bröd toppad med hemlagat potatismos, ketchup, senap och rostad lök.",
		price: 55,
		nisseQuote: "Västkustens stolthet – mättar mer än man tror!",
		category: "meal" as const,
		ingredients: [ING.korvbrod, ING.grilladKorv, ING.potatismos],
		condiments: [ING.ketchup, ING.senap],
		extras: [ING.rostadLok],
		onMenu: true,
		isLunch: true,
		inStock: true,
		sortOrder: 3,
	},
	{
		name: "Hel special",
		description:
			"Dubbel grillad korv i bröd med rejält lass potatismos, räksallad, bostongurka och rostad lök.",
		price: 75,
		nisseQuote: "När en korv helt enkelt inte räcker till.",
		category: "meal" as const,
		ingredients: [ING.korvbrod, ING.grilladKorv, ING.potatismos],
		condiments: [],
		extras: [ING.raksallad, ING.bostongurka, ING.rostadLok],
		onMenu: true,
		isLunch: true,
		inStock: true,
		sortOrder: 4,
	},
	{
		name: "Tunnbrödsrulle Klassiker",
		description:
			"Mjukt tunnbröd rullat kring grillad korv, potatismos, krämig räksallad, bostongurka och rostad lök.",
		price: 85,
		nisseQuote: "Det finns inget som en riktig rulle efter en lång dag.",
		category: "meal" as const,
		ingredients: [ING.tunnbrod, ING.grilladKorv, ING.potatismos],
		condiments: [],
		extras: [ING.raksallad, ING.bostongurka, ING.rostadLok],
		onMenu: true,
		isLunch: true,
		inStock: true,
		sortOrder: 5,
	},
	{
		name: "Nisses Lyxrulle",
		description:
			"Kryddig chorizo och potatismos i tunnbröd med västkustsallad, vitlöksdressing, knaperstekt bacon och jalapeños.",
		price: 99,
		nisseQuote: "Min personliga favorit – ta med extra servetter!",
		category: "meal" as const,
		ingredients: [ING.tunnbrod, ING.chorizo, ING.potatismos],
		condiments: [ING.vitloksdressing],
		extras: [ING.vastkustsallad, ING.bacon, ING.jalapenos],
		onMenu: true,
		isLunch: true,
		inStock: true,
		sortOrder: 6,
	},
	{
		name: "Mosbricka med grillad korv",
		description:
			"Generös portion potatismos serverad med grillad korv, ketchup, senap och finhackad rå lök.",
		price: 55,
		nisseQuote: "Inget krångel med bröd – rakt på sak med gaffel.",
		category: "meal" as const,
		ingredients: [ING.potatismos, ING.grilladKorv],
		condiments: [ING.ketchup, ING.senap],
		extras: [ING.raLok],
		onMenu: true,
		isLunch: true,
		inStock: true,
		sortOrder: 7,
	},
	{
		name: "Bratwurst i Brioche",
		description:
			"Saftig bratwurst i rostat briochebröd med stark senap, syrlig surkål och rostad lök.",
		price: 55,
		nisseQuote: "Lite kontinentalt mitt i korvmojen!",
		category: "meal" as const,
		ingredients: [ING.briochebrod, ING.bratwurst],
		condiments: [ING.starkSenap],
		extras: [ING.surkal, ING.rostadLok],
		onMenu: true,
		isLunch: true,
		inStock: true,
		sortOrder: 8,
	},
	{
		name: "Ost- & Baconbomben",
		description:
			"Ost- och baconkorv i briochebröd dränkt i smält cheddarost, knaperstekt bacon, jalapeños och vitlöksdressing.",
		price: 79,
		nisseQuote: "Mer ost och bacon har aldrig skadat någon.",
		category: "meal" as const,
		ingredients: [ING.briochebrod, ING.ostBaconKorv],
		condiments: [ING.vitloksdressing],
		extras: [ING.cheddar, ING.bacon, ING.jalapenos],
		onMenu: true,
		isLunch: true,
		inStock: true,
		sortOrder: 9,
	},
	{
		name: "Gröna Nisse & Pommes",
		description:
			"Krispiga pommes frites med smakrik vegokorv, remouladsås, ketchup och rostad lök.",
		price: 65,
		nisseQuote: "Helt grönt och lika gott som resten av menyn!",
		category: "meal" as const,
		ingredients: [ING.pommes, ING.vegokorv],
		condiments: [ING.remouladsas, ING.ketchup],
		extras: [ING.rostadLok],
		onMenu: true,
		isLunch: true,
		inStock: true,
		sortOrder: 10,
	},

	// ================= DRYCKER (6 st) =================
	{
		name: "Pucko Original 27 cl",
		description:
			"Iskall svensk chokladdryck på glasflaska – korvmojens bästa vän.",
		price: 22,
		nisseQuote: "En korv utan Pucko är bara en halv upplevelse.",
		category: "drink" as const,
		ingredients: [],
		condiments: [],
		extras: [],
		onMenu: true,
		isLunch: false,
		inStock: true,
		sortOrder: 11,
	},
	{
		name: "Trocadero 33 cl",
		description: "Klassisk svensk läsk med smak av äpple och apelsin.",
		price: 20,
		category: "drink" as const,
		ingredients: [],
		condiments: [],
		extras: [],
		onMenu: true,
		isLunch: false,
		inStock: true,
		sortOrder: 12,
	},
	{
		name: "Zingo Apelsin 33 cl",
		description: "Fruktig och uppfriskande apelsinläsk.",
		price: 20,
		category: "drink" as const,
		ingredients: [],
		condiments: [],
		extras: [],
		onMenu: true,
		isLunch: false,
		inStock: true,
		sortOrder: 13,
	},
	{
		name: "Coca-Cola Original 33 cl",
		description: "Välkyld burk Coca-Cola.",
		price: 20,
		category: "drink" as const,
		ingredients: [],
		condiments: [],
		extras: [],
		onMenu: true,
		isLunch: false,
		inStock: true,
		sortOrder: 14,
	},
	{
		name: "Pepsi Max 33 cl",
		description: "Sockerfri cola med maximal smak.",
		price: 20,
		category: "drink" as const,
		ingredients: [],
		condiments: [],
		extras: [],
		onMenu: true,
		isLunch: false,
		inStock: true,
		sortOrder: 15,
	},
	{
		name: "Loka Citron 33 cl",
		description: "Kolsyrat svenskt källvatten med frisk smak av citron.",
		price: 18,
		category: "drink" as const,
		ingredients: [],
		condiments: [],
		extras: [],
		onMenu: true,
		isLunch: false,
		inStock: true,
		sortOrder: 16,
	},
];

async function seedProducts() {
	const connectionString = process.env.CONNECTION_STRING;

	if (!connectionString) {
		throw new Error("CONNECTION_STRING saknas i .env");
	}

	try {
		await mongoose.connect(connectionString);
		console.log("Ansluten till MongoDB...");

		await Product.deleteMany({});
		console.log("Rensade gamla produkter.");

		const created = await Product.insertMany(products);
		console.log(
			`Seedade ${created.length} produkter (10 rätter + 6 drycker) för Nisses Korvmoj!`,
		);
	} catch (error) {
		console.error("Fel vid seeding av produkter:", error);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
		console.log("Frånkopplad från MongoDB.");
	}
}

seedProducts();
