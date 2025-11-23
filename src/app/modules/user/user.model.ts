import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config";
import { USER_STATUS } from "./user.constance";

const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    }, email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    needPasswordChange: {
        type: Boolean,
        default: true,
    }, passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
        default: 'student'
    },
    status: {
        type: String,
        enum: USER_STATUS,
        default: 'is-active',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds))
    next()
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password')
}

userSchema.statics.isStatusActive = async function (id: string) {
    const user = await User.findOne({ id })
    return user?.status === 'is-active'
}

userSchema.statics.isUserDeleted = async function (id: string) {
    const user = await User.findOne({ id })
    return user?.isDeleted === true
}

userSchema.post('save', function (doc, next) {
    doc.password = ""
    next()
})

userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
    passwordChangedTimestamp: Date | null,
    jwtIssuedTimestamp: number
): Promise<boolean> {

    // User never changed password → token still valid
    if (!passwordChangedTimestamp) {
        return false;
    }

    // Convert to seconds
    const passwordChangedTimeInSeconds = Math.floor(
        new Date(passwordChangedTimestamp).getTime() / 1000
    );

    return passwordChangedTimeInSeconds > jwtIssuedTimestamp;
};



export const User = model<TUser, UserModel>("User", userSchema);