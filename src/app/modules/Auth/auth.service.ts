import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import bcrypt from "bcryptjs";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  //   const accessToken = jwt.sign(
  //     {
  //       email: userData.email,
  //       role: userData.role,
  //     },
  //     "secretkey",
  //     {
  //       algorithm: "HS256",
  //       expiresIn: "5m",
  //     }
  //   );

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_SECRET_EXPIRESIN as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.JWT_REFRESH_SECRET as string,
    process.env.JWT_REFRESH_SECRET_EXPIRESIN as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      process.env.JWT_REFRESH_SECRET as string
    );
  } catch (error) {
    throw new Error("You are not authorized!");
  }
  //  user exists or not
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_SECRET_EXPIRESIN as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
