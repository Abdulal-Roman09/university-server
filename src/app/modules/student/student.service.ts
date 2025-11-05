import { TStudent } from "./student.interface";
import { Student } from "./student.model";


const createStudentIntoDB = async (studentdata: TStudent) => {
  const student = new Student(studentdata);

  if (await student.isUserExists(studentdata.id)) {
    throw new Error("user is alrady exist");
  }

  const result = await student.save();
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

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
