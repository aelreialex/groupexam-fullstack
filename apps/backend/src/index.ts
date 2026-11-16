import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';

// config

dotenv.config();
const test = process.env.CONNECTION_STRING;

if(!test) {
	throw new Error("No connection string found no connection to the database")
}


mongoose.connect(test);

const database = mongoose.connection;
const PORT = process.env.PORT || 8080;

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
	origin : `http://localhost:${PORT}`,
	credentials : true
}));
app.use(cookieParser());

//routes

// database connection and port
database.on("error", (error) => console.log(error));
database.once("connected", () => {
	console.log("We're live!")
	app.listen(PORT, () => {
		console.log(`API running on ${PORT}`);
	});
});
