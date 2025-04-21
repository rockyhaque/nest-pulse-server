import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";

const getAllUserFromDB = catchAsync(async (req, res) => {
  // const filters = req.query
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log(options);
  const result = await adminService.getAllUserFromDB(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admins fetched Successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getUserByIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getUserByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin fetched Successfully!",
    data: result,
  });
});

const updateUserIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.updateUserIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin updated Successfully!",
    data: result,
  });
});

const deleteUserFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin deleted Successfully!",
    data: result,
  });
});

const softDeleteUserFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await adminService.softDeleteUserFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin deleted Successfully!",
    data: result,
  });
});

export const adminController = {
  getAllUserFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  softDeleteUserFromDB,
};
