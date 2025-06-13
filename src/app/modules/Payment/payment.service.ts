import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { SSLService } from "../SSL/ssl.service";
import { PaymentStatus } from "@prisma/client";

const initPayment = async (appointmentId: string) => {
  try {
    const paymentData = await prisma.payment.findFirst({
      where: {
        appointmentId,
      },
      include: {
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });

    if (!paymentData) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Payment Not found");
    }

    const initPaymentData = {
      amount: paymentData?.amount,
      transactionId: paymentData.transactionId,
      name: paymentData.appointment.patient.name,
      email: paymentData.appointment.patient.email,
      address: paymentData.appointment.patient.address,
      contactNumber: paymentData.appointment.patient.contactNumber,
    };

    const result = await SSLService.initPayment(initPaymentData);

    return {
      paymentURL: result.GatewayPageURL,
    };
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Payment initiate failed");
  }
};

const validatePayment = async (payload: any) => {
  // * Production use only
  // if (!payload || !payload.status || !(payload.status === "VALID")) {
  //   return {
  //     message: "Invalid Payment",
  //   };
  // }

  // const response = await SSLService.validatetPayment(payload);

  // if (response?.status !== "VALID") {
  //   return {
  //     message: "Payment Failed",
  //   };
  // }

  // * Local use only
  const response = payload;

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response?.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID
      },
    });
  });

  return {
    message: "Payment Success"
  }
};

export const PaymentService = {
  initPayment,
  validatePayment,
};
