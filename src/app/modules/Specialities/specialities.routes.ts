import express, { NextFunction, Request, Response } from "express";
import { specialitiesController } from "./specialities.controller";
import { fileUploader } from "../../../helpers/fileUploader";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { SpecialitiesValidtaion } from "./specialities.validation";

const router = express.Router();

router.get("/", specialitiesController.getAllFromDB);

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialitiesValidtaion.create.parse(JSON.parse(req.body.data));
    return specialitiesController.insertIntoDB(req, res, next);
  }
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  specialitiesController.deleteFromDB
);

export const specialitiesRoutes = router;
