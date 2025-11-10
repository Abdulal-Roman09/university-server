import { academiSemesterNameCodeMapper } from "./academicSemester.contance";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemeterIntoDB = async (payload: TAcademicSemester) => {
  if (academiSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemisterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemisterFromDb = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDb = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academiSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const AcademicsemesterServices = {
  createAcademicSemeterIntoDB,
  getAllAcademicSemisterFromDb,
  getSingleAcademicSemisterFromDb,
  updateAcademicSemesterIntoDb,
};
