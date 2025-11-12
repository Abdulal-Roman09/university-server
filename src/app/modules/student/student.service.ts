import { Student } from "./student.model";

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
  const result = await Student.findByIdAndUpdate(id, payload, {
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
  const result = await Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentInDB,
  deleteStudentFromDB
};
