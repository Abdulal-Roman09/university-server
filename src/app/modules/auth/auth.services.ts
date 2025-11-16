
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import AppError from "../../errors/AppError.";



const loginUser = async (payload: TLoginUser) => {
    // Check if user exists
    const user = await User.findOne({ id: payload.id });
    if (!user) {
        // 404 Not Found – user not found
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    // Check if user is deleted
    if (user.isDeleted) {
        // 410 Gone – resource deleted
        throw new AppError(httpStatus.GONE, 'This user is deleted');
    }

    // Check if user is blocked
    if (user.status === 'blocked') {
        // 403 Forbidden – user blocked
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
    }

    // Chack the password is correncted
    const isPasswordMatched =await bcrypt.compare(payload?.password, user?.password)

};

export const AuthServices = {
    loginUser
};
