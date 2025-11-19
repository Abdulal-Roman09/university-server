import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status';
import AppError from "../../errors/AppError.";

const loginUser = async (payload: TLoginUser) => {

  const user = await User.isUserExistsByCustomId(payload.id);
  console.log("user password :", user?.password)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }

  // check is active
  const isActive = await User.isStatusActive(payload.id);
  if (!isActive) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  // check password match
  const isMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );
  console.log(payload.password, user.password);
  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  return user;
};

export const AuthServices = {
  loginUser,
};
