import User from "../models/user.model"
import type { RegisterRequestBody, LoginRequestBody } from "../controllers/auth.controller"
import * as userService from "../services/user.service";
import { hashPassword, matchPassword } from "../utils/bcrypt.utils";
import { signToken } from "../utils/jwt.utils";

export const registerUser = async (user: RegisterRequestBody) => {
    const existingUser = await userService.getUser(user.username);

    if (existingUser.user) {
            const error = new Error("Username already exists") as Error & { status?: number };
            error.status = 400;
            throw error;
        }

    const hashedPassword = await hashPassword(user.password);

    const result = await User.create({
        username: user.username,
        password: hashedPassword,
        role: user.role
    });
    return{
        success: true,
        message: "User registered",
        user: result.username
    }
}

export const loginUser = async (user: LoginRequestBody) => {
    const existingUser = await userService.getUser(user.username);

        if (!existingUser.user) {
            const error = new Error("Username or Password is incorrect") as Error & { status?: number };
            error.status = 401;
            throw error;
        }

        const correctPassword = await matchPassword(user.password, existingUser.user.password)

        if(!correctPassword) {
            const error = new Error("Username or Password is incorrect") as Error & { status?: number };
            error.status = 401;
            throw error;
        }

        const token = signToken({
            username : existingUser.user.username,
            role : existingUser.user.role
        })

        return{
            success: true,
            message: "Logged in",
            token
        }
}