import { Schema, model} from "mongoose"
import { type User } from "@app/shared";


const userSchema = new Schema<Omit<User, "_id">>({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    passwordHashed: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['staff', 'admin'],
        default: 'staff'
    }
})

const User = model("User", userSchema);
export default User;