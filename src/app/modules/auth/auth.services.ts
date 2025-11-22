import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError.";
import bcrypt from "bcryptjs";
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";


// ======================================================
//                 LOGIN USER (Single DB Call)
// ======================================================
const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ id: payload.id }).select("+password");

  if (!user) throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  if (user.isDeleted) throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  if (user.status === "blocked") throw new AppError(httpStatus.FORBIDDEN, "User is blocked");

  const isMatched = await bcrypt.compare(payload.password, user.password);
  if (!isMatched) throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");

  const jwtPayload = { userId: user.id, role: user.role };

  return {
    accessToken: createToken(jwtPayload, config.jwt_access_secret!, config.jwt_access_expires_in!),
    refreshToken: createToken(jwtPayload, config.jwt_refresh_secret!, config.jwt_refresh_expires_in!),
    needPasswordChange: user.needPasswordChange,
  };
};


// ======================================================
//              CHANGE PASSWORD (Single DB Call)
// ======================================================
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findOne({ id: userData.userId }).select("+password");
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  if (user.isDeleted) throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  if (user.status === "blocked") throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");

  const isMatched = await bcrypt.compare(payload.oldPassword, user.password);
  if (!isMatched) throw new AppError(httpStatus.FORBIDDEN, "Password does not match");

  const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

  user.password = newHashedPassword;
  user.needPasswordChange = false;
  user.passwordChangedAt = new Date();

  await user.save();

  return null;
};


// ======================================================
//              REFRESH TOKEN (Single DB Call)
// ======================================================
const refreshToken = async (token: string) => {
  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(token, config.jwt_refresh_secret!) as JwtPayload;
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }

  const user = await User.findOne({ id: decoded.userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  if (user.isDeleted) throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  if (user.status === "blocked") throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");

  if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Token expired due to password change");
  }

  const jwtPayload = { userId: user.id, role: user.role };

  return {
    accessToken: createToken(jwtPayload, config.jwt_access_secret!, config.jwt_access_expires_in!),
  };
};


// ======================================================
//            FORGET PASSWORD (Single DB Call)
// ======================================================
const forgetPassword = async (userId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  if (user.isDeleted) throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  if (user.status === "blocked") throw new AppError(httpStatus.FORBIDDEN, "User is blocked");

  const resetToken = createToken(
    { userId: user.id, role: user.role },
    config.jwt_access_secret!,
    "10m"
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
  console.log(resetUILink)
  await sendEmail(user.email, resetUILink);
};



// ======================================================
//             RESET PASSWORD (Single DB Call)
// ======================================================
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const user = await User.findOne({ id: payload.id }).select("+password");
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  if (user.isDeleted) throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  if (user.status === "blocked") throw new AppError(httpStatus.FORBIDDEN, "User is blocked");

  const decoded = jwt.verify(token, config.jwt_access_secret!) as JwtPayload;

  if (decoded.userId !== payload.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid reset request");
  }

  const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

  user.password = newHashedPassword;
  user.needPasswordChange = false;
  user.passwordChangedAt = new Date();

  await user.save();
};


export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
