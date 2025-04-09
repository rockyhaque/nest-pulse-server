import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";



const getAllUserFromDB = async (req: Request, res: Response) => {
  try {
    // const filters = req.query
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options)
    const result = await adminService.getAllUserFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admins fetched Successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: error,
    });
  }
};

export const adminController = {
  getAllUserFromDB,
};
