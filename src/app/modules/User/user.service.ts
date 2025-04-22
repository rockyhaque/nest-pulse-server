import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";

const createAdmin = async (req: any) => {
  // console.log("File", req.file);
  // console.log("Data", req.body.data);



  const file: IFile = req.file;
  if(file){
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }
  
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdAdminData = await tx.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const userService = {
  createAdmin,
};
