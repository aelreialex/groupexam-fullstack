import { z } from "zod";

export const createUserSchema = z.object({
    _id: z.string(),
    userName: z.string(),
    passwordHashed: z.string(),
    role: z.enum(["staff", "admin"])
})

export type User = z.infer<typeof createUserSchema>;