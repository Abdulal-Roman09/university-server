import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

  // create a user object
  const userData: Partial<TUser> = {}
  // if pass is not given use defult pass
  userData.password = password || (config.default_password as string)
  // set student role
  userData.role = "student"

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
  console.log(admissionSemester)
  if (!admissionSemester) {
    throw new Error("Admission semester not found");
  }

  // set generated id
  userData.id = await generateStudentId(admissionSemester)

  // create a user
  const newUser = await User.create(userData)

  // create a student
  if (Object.keys(newUser).length) {
    //set student id 
    payload.id = newUser.id
    payload.user = newUser._id //ref id

    const newStudent = await Student.create(payload)
    return newStudent
  }
  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};