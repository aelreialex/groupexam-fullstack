import { Schema, model} from "mongoose"
import { type User } from "@app/shared";


const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['staff', 'admin'],
        default: 'staff'
    }
})

const User = model("User", userSchema);
export default User;