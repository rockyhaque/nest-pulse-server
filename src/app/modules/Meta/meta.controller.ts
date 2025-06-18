import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { MetaService } from "./meta.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../interfaces/common";

const fetchDashboardMetaData = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const result = await MetaService.fetchDashboardMetaData(user as TAuthUser);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Meta data retrival successfully!",
      data: result,
    });
  }
);

export const MetaController = {
  fetchDashboardMetaData,
};
