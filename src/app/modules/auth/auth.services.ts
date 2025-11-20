import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status';
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError.";
import bcrypt from 'bcryptjs';


const loginUser = async (payload: TLoginUser) => {

  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }

  const isActive = await User.isStatusActive(payload.id);
  if (!isActive) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  const isMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );

  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    { expiresIn: '10d' }
  );

  return {
    accessToken,
    needPasswordChange: user.needPasswordChange,
  };
};

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {

//   // 1. check if user exists
//   const user = await User.isUserExistsByCustomId(userData.userId);
//   // user kno khoje paiteche na

//   console.log(userData)

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
//   }

//   // 2. deleted check
//   if (user.isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
//   }

//   // 3. blocked check
//   if (user.status === "blocked") {
//     throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
//   }

//   // 4. compare old password
//   const isMatched = await User.isPasswordMatched(
//     payload.oldPassword,
//     user.password
//   );

//   if (!isMatched) {
//     throw new AppError(httpStatus.FORBIDDEN, "Old password is incorrect!");
//   }

//   // 5. hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds)
//   );

//   // 6. update password
//   await User.findOneAndUpdate(
//     { id: userData.userId },
//     {
//       password: newHashedPassword,
//       needPasswordChange: false,
//       passWordChangetAt: new Date(),
//     }
//   );

//   return {
//     message: "Password changed successfully!",
//   };
// };
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};
export const AuthServices = {
  loginUser,
  changePassword,
};
