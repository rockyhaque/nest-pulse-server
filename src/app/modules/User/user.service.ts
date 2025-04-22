import { Patient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import { Request } from "express";

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

const createDoctor = async (req: any) => {

  const file: IFile = req.file;
  if(file){
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }
  
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdDoctorData = await tx.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData;
  });

  return result;
};

const createPatient = async (req: Request): Promise<Patient> => {
  const file = req.file as IFile;

  if (file) {
      const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
      req.body.patient.profilePhoto = uploadedProfileImage?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

  const userData = {
      email: req.body.patient.email,
      password: hashedPassword,
      role: UserRole.PATIENT
  }

  const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.user.create({
          data: userData
      });

      const createdPatientData = await transactionClient.patient.create({
          data: req.body.patient
      });

      return createdPatientData;
  });

  return result;
};

export const userService = {
  createAdmin,
  createDoctor,
  createPatient
};
