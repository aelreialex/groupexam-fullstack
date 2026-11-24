export interface ErrorType {
    status: number;
    message: string;
}

export type UserRole = 'staff' | 'admin';

export interface JwtPayload {
    username : string;
    role : UserRole;
}