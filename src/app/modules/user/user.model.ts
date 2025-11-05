import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    needPasswordChange: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
        default: 'student'
    },
    status: {
        type: String,
        enum: ['is-active', 'blocked'],
        default: 'is-active',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const User = model<TUser>("User", userSchema);
