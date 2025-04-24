import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { specialtiesService } from "./specialties.service";
import { Request, Response } from "express";

const insertIntoDB = catchAsync(async (req, res) => {

    const result = await specialtiesService.insertIntoDB(req);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Specialties added Successfully!",
      data: result,
    });
  });
  
  const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await specialtiesService.getAllFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Specialties data fetched successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await specialtiesService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});

  export const specialtiesController = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB

  };
  