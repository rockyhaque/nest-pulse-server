import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validations";

const router = express.Router();

router.get("/", adminController.getAllUserFromDB);
router.get("/:id", adminController.getUserByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  adminController.updateUserIntoDB
);
router.delete("/:id", adminController.deleteUserFromDB);
router.delete("/soft/:id", adminController.softDeleteUserFromDB);

export const adminRoutes = router;
