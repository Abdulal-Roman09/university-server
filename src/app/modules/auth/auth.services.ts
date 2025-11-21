import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError.";
import bcrypt from "bcryptjs";
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

// ----------------- LOGIN USER -----------------
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

  const isMatched = await User.isPasswordMatched(payload.password, user.password);

  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_access_expires_in!
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    config.jwt_refresh_expires_in!
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

// ----------------- CHANGE PASSWORD -----------------
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !");
  }

  const isMatched = await User.isPasswordMatched(payload.oldPassword, user.password);

  if (!isMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

// ----------------- REFRESH TOKEN -----------------
const refreshToken = async (token: string) => {
  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(token, config.jwt_refresh_secret!) as JwtPayload;
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }

  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !");
  }

  // check password changed after token issued
  if (
    user.passwordChangedAt &&
    (await User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat!))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Token expired due to password change");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_access_expires_in!
  );

  return { accessToken };
};

// ----------------- FORGET PASSWORD -----------------
const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }

  const isActive = await User.isStatusActive(userId);
  if (!isActive) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  // create reset token — valid for 10 minutes
  const resetToken = createToken(
    { userId: user.id, role: user.role },
    config.jwt_access_secret!,
    "10m"
  );

  const resetUILink = `http://localhost:3000?id=${user.id}&token=${resetToken}`;
  
  sendEmail()

  console.log(resetUILink)
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
