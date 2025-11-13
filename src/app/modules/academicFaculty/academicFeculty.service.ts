import AppError from "../../errors/AppError.";
import { TAcademicFeculty } from "./academicFeculty.interface";
import { AcademicFeculty } from "./academicFeculty.model";
import httpStatus from 'http-status';

const createAcademicFecultyIntoDb = async (payload: TAcademicFeculty) => {
  const result = await AcademicFeculty.create(payload);
  return result;
};

const getAllAcademicFecultyFromDb = async () => {
  const result = await AcademicFeculty.find();
  return result;
};

const getSingleAcademicFecultyFromDb = async (id: string) => {
  const result = await AcademicFeculty.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Feculty is Not Found")
  }
  return result;
};

const updateAcademicFecultyIntoDb = async (id: string, payload: Partial<TAcademicFeculty>
) => {
  const result = await AcademicFeculty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicFecultyServices = {
  createAcademicFecultyIntoDb,
  getAllAcademicFecultyFromDb,
  getSingleAcademicFecultyFromDb,
  updateAcademicFecultyIntoDb,
};
