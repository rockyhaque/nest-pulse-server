import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import ApiError from "../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Your are unauthorized");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.access_secret as Secret
      );

      req.user = verifiedUser;

      /*
        verifiedUser console
            {
                email: 'm@gmail.com',
                role: 'ADMIN',
                iat: 1745129287,
                exp: 1745129587
            }
       */
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Access denied. Forbidden.");
      }
      next();
      console.log(verifiedUser);
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
