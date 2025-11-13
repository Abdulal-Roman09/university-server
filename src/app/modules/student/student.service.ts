import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError.";
import httpStatus from 'http-status';
import { User } from "../user/user.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate({
      path: 'admissionSemester',
    })
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFeculty',
      }
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate({
      path: 'admissionSemester',
    })
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFeculty',
      }
    });
  return result;
};

const updateStudentInDB = async (id: string, payload: Partial<typeof Student>) => {
  const result = await Student.findOneAndUpdate({ id }, payload, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: 'admissionSemester',
    })
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFeculty',
      }
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession()

  try {

    session.startTransaction()

    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session })

    if (!deleteStudent) {
      throw new AppError(httpStatus.NOT_FOUND, "Delete Student Successfully")
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    await session.commitTransaction()
    await session.endSession()
    
    return deleteStudent

  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error("Filded to delete Student")
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentInDB,
  deleteStudentFromDB
};
