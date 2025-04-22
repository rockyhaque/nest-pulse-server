import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createAdmin = catchAsync(async (req, res) => {
  //* using form data
  // console.log("File", req.file);
  // console.log("Data", req.body.data);
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin Created Successfully!",
    data: result,
  });
});

export const userController = {
  createAdmin,
};
