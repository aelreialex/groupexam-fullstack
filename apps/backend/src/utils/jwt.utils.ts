import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import type { JwtPayload } from "../types/types"


const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('JWT_SECRET är inte definierad i miljövariablerna')
    }
    return secret;
}


export const signToken = (payload : JwtPayload) => {
    const secret = getJwtSecret();
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
}

export const verifyToken = (token : string) => {
    const secret = getJwtSecret();
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        throw createError(401, 'Invalid token');
    }
}