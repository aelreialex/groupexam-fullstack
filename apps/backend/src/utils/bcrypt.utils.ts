import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const matchPassword = async (password : string, hashedPassword : string): Promise<boolean> => {
    const matched = await bcrypt.compare(password, hashedPassword)
    return matched
}