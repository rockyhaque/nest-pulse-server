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

const createDoctor = catchAsync(async (req, res) => {
  const result = await userService.createDoctor(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor Created Successfully!",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {

  const result = await userService.createPatient(req);
  sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Patient Created successfuly!",
      data: result
  })
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient
};
