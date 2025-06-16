import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TAuthUser } from "../../interfaces/common";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/sendResponse";
import { ReviewService } from "./review.service";
import pick from "../../../shared/pick";
import { reviewFilterableFields } from "./review.constant";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const result = await ReviewService.insertIntoDB(user as TAuthUser, req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Review created successfully",
      data: result,
    });
  }
);

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, reviewFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await ReviewService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Reviews retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});


export const ReviewController = {
  insertIntoDB,
  getAllFromDB
};
