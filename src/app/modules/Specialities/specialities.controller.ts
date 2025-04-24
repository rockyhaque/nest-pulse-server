import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { specialitiesService } from "./specialities.service";

const insertIntoDB = catchAsync(async (req, res) => {

    const result = await specialitiesService.insertIntoDB(req);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Specialities added Successfully!",
      data: result,
    });
  });
  
  const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await specialitiesService.getAllFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Specialities data fetched successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await specialitiesService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});

  export const specialitiesController = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB

  };
  