import mongoose from "mongoose";
import UserModel from "../models/user.model"; // Justera sökvägen till din Mongoose-modell
import dotenv from "dotenv";
// import { type User } from "@app/shared";
import { hashPassword } from "../utils/bcrypt.utils";

dotenv.config();


// const testUsers: Omit<User, "_id">[] = [
//       {
//         userName: "admin_anna",
//         passwordHashed: "hashed_password_123",
//         role: "admin",
//       },
//       {
//         userName: "staff_stefan",
//         passwordHashed: "hashed_password_456",
//         role: "staff",
//       },
//       {
//         userName: "staff_sara",
//         passwordHashed: "hashed_password_789",
//         role: "staff",
//       },
//       {
//         userName: "admin_alex",
//         passwordHashed: "hashed_password_abc",
//         role: "admin",
//       },
//     ];

// async function seedUsers() {
// 	const connectionString = process.env.CONNECTION_STRING;

// 	if (!connectionString) {
// 		throw new Error("CONNECTION_STRING saknas i .env");
// 	}

// 	try {
// 		await mongoose.connect(connectionString);
// 		console.log("Ansluten till MongoDB...");

// 		// Rensa befintliga ingredienser så du kan köra skriptet flera gånger utan dubbletter
// 		await UserModel.deleteMany({});
// 		console.log("Rensade gamla users.");

// 		const created = await UserModel.insertMany(testUsers);
// 		console.log(
// 			`Seedade ${created.length} users för Nisses Korvmoj!`,
// 		);
// 	} catch (error) {
// 		console.error("Fel vid seeding:", error);
// 		process.exitCode = 1;
// 	} finally {
// 		await mongoose.disconnect();
// 		console.log("Frånkopplad från MongoDB.");
// 	}
// }

// seedUsers();

const seedUsers = async () => {
    const connectionString = process.env.CONNECTION_STRING;

	if (!connectionString) {
		throw new Error("CONNECTION_STRING saknas i .env");
	}

    try {
        // 1. Anslut till MongoDB (hämtar från din .env-fil)
        await mongoose.connect(connectionString);
		console.log("Ansluten till MongoDB...");

        // 2. Rensa bort gamla testanvändare (valfritt, bra om man kör om scriptet)
        await UserModel.deleteMany({});

        // 3. Skapa ett hashade lösenord med din funktion
        const securePassword = await hashPassword('admin123');

        // 4. Skapa en ny användare med din modell
        const adminUser = new UserModel({
            userName: 'admin',
            passwordHashed: securePassword,
            role: 'admin'
        });

        // 5. Spara till databasen
        await adminUser.save();
        console.log('Admin-användare skapad framgångsrikt!');

        // Stäng anslutningen när vi är klara
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Fel vid seeding:', error);
        process.exit(1);
    }
};

seedUsers();