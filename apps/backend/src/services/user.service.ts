import User from "../models/user.model"
// import type { RegisterRequestBody } from "../controllers/auth.controller"


export const getUser = async (username : string) => {
    const result = await User.findOne({
        username
    })
    return {
        success: true,
        user: result
    }
}