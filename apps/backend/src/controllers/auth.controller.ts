import { Request, Response, NextFunction } from "express"
import * as authService from "../services/auth.service";

export interface RegisterRequestBody {
    username: string;
    password: string;
    role: 'staff' | 'admin';
}

export interface LoginRequestBody {
    username: string;
    password: string;
}

export const registerUser = async (req: Request<{}, {}, RegisterRequestBody>, res: Response, next: NextFunction): Promise<void> => {


    if (!req.body.username || !req.body.password) {
            return next({
                status: 400,
                message: "Användarnamn och lösenord måste vara ifyllda",
            });
        }

    const result = await authService.registerUser({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });

    res.status(201).json({
        success: true,
        message: "Användaren registrerad",
        user: result.user
    });
};

export const loginUser = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction): Promise<void> => {

    // if (!req.body.username || !req.body.password) {
    //     return next({
    //         status: 400,
    //         message: "Användarnamn och lösenord måste vara ifyllda",
    //     });
    // }

    const result = await authService.loginUser({
        username: req.body.username,
        password: req.body.password
    })

    res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, 
    });

    res.status(200).json({
        success: true,
        message: "Logged in successfully"
    })
}

