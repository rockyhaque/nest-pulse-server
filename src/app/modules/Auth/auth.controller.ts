import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./auth.service";

const loginUser  = catchAsync(async(req, res) => {
    const result = await authService.loginUser(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Logged in Successfull",
        data: result
    })
})

export const authController = {
    loginUser
}