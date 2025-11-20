import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError.';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // check the token is valid
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Token is not send")
        }
        // chack the token is valid
        jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
            if (err) {
                throw new AppError(httpStatus.UNAUTHORIZED, "you are not authrozed ")
            }
            const role = (decoded as JwtPayload).role
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, "you are not authrozed ")
            }

            req.user = decoded as JwtPayload
            next()
        })

    }
    )
};

export default auth