import { TStudent } from "./student.interface";
import { Student } from "./student.model";


const createStudentIntoDB = async (studentdata: TStudent) => {
  if (await Student.isUserExists(studentdata.id)) {
    throw new Error("user is alrady exist");
  }

  // const student = new Student(studentdata);

  // if (await student.isUserExists(studentdata.id)) {
  //   throw new Error("user is alrady exist");
  // }
  // const result = await student.save();

  const result = await Student.create(studentdata)
  return result;
};


const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
