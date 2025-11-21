import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError.';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
    
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Token is not provided");
        }
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
        ) as JwtPayload;

        const { role, userId } = decoded;

        // ---------------------------
        // 1️⃣ Check user exists
        // ---------------------------
        const user = await User.isUserExistsByCustomId(userId);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found");
        }

        // ---------------------------
        // 2️⃣ Check soft deleted
        // ---------------------------
        if (user.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
        }

        // ---------------------------
        // 3️⃣ Check blocked
        // ---------------------------
        if (user.status === "blocked") {
            throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
        }

        // ---------------------------
        // 4️⃣ Role based access control
        // ---------------------------
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }

        // Attach decoded
        req.user = decoded;

        next();
    });
};

export default auth;
