import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentdata: TStudent) => {

  // create a user object
  const userData: Partial<TUser> = {}
  // if pass is not given use defult pass
  userData.password = password || (config.default_password)
  // set student role
  userData.role = "student"
  // set manualy genarted id
  userData.id = '2030010001'

  // create a user
  const newUser = await User.create(userData)

  // create a student
  if (Object.keys(newUser).length) {
    //set student id 
    studentdata.id = newUser.id
    studentdata.user = newUser._id //ref id

    const newStudent = await Student.create(studentdata)
    return newStudent
  }
  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};