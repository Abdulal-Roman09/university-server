import { model, Schema } from "mongoose";
import { TUser } from "./user.service";

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    needPasswordChange: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    status: {
        type: String,
        enum: ['is-acitive', 'bloced']
    },
    isDeleted: {
        type: Boolean,
        required: true
    }

},  { timestamps: true })


export const User =model<TUser>("User",userSchema)