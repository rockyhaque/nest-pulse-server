import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Logged in Successfull",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

export const authController = {
  loginUser,
};
