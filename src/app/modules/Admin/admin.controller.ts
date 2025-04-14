import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllUserFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const getUserByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.getUserByIdFromDB(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin fetched Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.updateUserIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin updated Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteUserFromDB(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin deleted Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const softDeleteUserFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.softDeleteUserFromDB(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin deleted Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const adminController = {
  getAllUserFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  softDeleteUserFromDB,
};
