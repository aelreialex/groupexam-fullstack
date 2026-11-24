import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().min(4, "Du behöver ha minst 4 tecken i ditt användarnamn" ).trim().regex(/^[a-zA-Z0-9]+$/, "Användarnamnet får bara innehålla bokstäver och nummer"),
    password: z.string().min(6, "Ditt lösenord behöver minst 6 tecken" ).trim().regex(/^\S+$/, "Lösenordet får inte ha blank spaces"),
    role: z.enum(["staff", "admin"]).default('staff')
})

export type User = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
    username: z.string({ error: "Användarnamn måste finnas med!" }).min(1, "Användarnamn måste finnas med!"),
    password: z.string({ error: "Lösenord måste finnas med!" }).min(1, "Lösenord måste anges!")
})