import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError.";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password is not provided, use default password
  userData.password = password || (config.default_password as string);

  // Set user role
  userData.role = "student";

  // Find academic semester info

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }

  // Start session
  const session = await mongoose.startSession();

  try {

    session.startTransaction();

    // Generate student ID based on semester info
    userData.id = await generateStudentId(admissionSemester);

    // Create User (Transaction step 1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // Attach user id and reference to student payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create Student (Transaction step 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // Commit transaction after both creations succeed
    await session.commitTransaction();
    await session.endSession()

    return newStudent[0];

  } catch (err) {

    // Abort transaction if any error occurs
    await session.abortTransaction();
    await session.endSession()
    throw new Error("filded to create student")
  }
};

export const UserServices = {
  createStudentIntoDB,
};
