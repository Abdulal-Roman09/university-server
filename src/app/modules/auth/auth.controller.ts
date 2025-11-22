import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { AuthServices } from "./auth.services";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {

  const { accessToken, refreshToken, needPasswordChange } =
    await AuthServices.loginUser(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result
  });
});

const refreshToken = catchAsync(async (req, res) => {

  const { refreshToken } = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'refresh token get  successfully',
    data: result
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id
  const result = await AuthServices.forgetPassword(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'link genarated  successfully',
    data: result
  });
});

const resetPassword = catchAsync(async (req, res) => {

  const token = req.headers.authorization
  const result = await AuthServices.resetPassword(req.body, token)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password is reset successfully',
    data: result
  });
});


export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
};
