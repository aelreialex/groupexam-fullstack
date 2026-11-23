import { z } from "zod";

export const createUserSchema = z.object({
    _id: z.string(),
    username: z.string().min(4),
    password: z.string().min(4),
    role: z.enum(["staff", "admin"])
})

export type User = z.infer<typeof createUserSchema>;