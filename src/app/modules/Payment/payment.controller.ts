import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";

const initPayment = catchAsync(async (req, res) => {
  const  { appointmentId} = req.params;
  const result = await PaymentService.initPayment(appointmentId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment initiate successfully",
    data: result,
  });
});

const validatePayment = catchAsync(async (req, res) => {
  
  const result = await PaymentService.validatePayment(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment validate successfully",
    data: result,
  });
});

export const PaymentController = {
  initPayment,
  validatePayment
};
