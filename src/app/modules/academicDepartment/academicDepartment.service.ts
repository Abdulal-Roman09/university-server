import AppError from "../../errors/AppError.";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
import  httpStatus  from 'http-status';


const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
};

const getAllAcademicDepartmentFromDb = async () => {
    const result = await AcademicDepartment.find().populate('academicFeculty')
    return result;
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate('academicFeculty');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Department not found");
  }
  return result;
};

const updateAcademicDepartmentIntoDb = async (
    id: string,
    payload: Partial<TAcademicDepartment>
) => {
    const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDb: createAcademicDepartmentIntoDb,
    getAllAcademicDepartmentFromDb,
    getSingleAcademicDepartmentFromDb,
    updateAcademicDepartmentIntoDb,
};
