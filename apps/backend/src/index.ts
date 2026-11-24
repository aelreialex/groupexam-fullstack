import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import menuRouter from "./routes/menu.route"
import authRouter from "./routes/auth.routes"

// config

dotenv.config();
const test = process.env.CONNECTION_STRING;

if (!test) {
	throw new Error("No connection string found no connection to the database");
}

mongoose.connect(test);

const database = mongoose.connection;
const PORT = process.env.PORT || 8080;

const app = express();

const frontendAdress = process.env.FRONTEND_ADDRESS;

// middlewares
app.use(express.json());
// app.use(
// 	cors({
// 		origin: frontendAdress,
// 		credentials: true,
// 	}),
// );

const allowedOrigins = [
	frontendAdress?.replace(/\/$/, ""),
	"http://localhost:5173",
].filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			if (
				!origin ||
				allowedOrigins.includes(origin) ||
				origin.endsWith(".vercel.app")
			) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);

app.use(cookieParser());

//routes

app.use("/api/menu", menuRouter);
app.use("/api/auth", authRouter)

// database connection and port
database.on("error", (error) => console.log(error));
database.once("connected", () => {
	console.log("We're live!");
	app.listen(PORT, () => {
		console.log(`API running on ${PORT}`);
	});
});

app.use(errorHandler);
