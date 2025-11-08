import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// find  lest students
export const findLastStudent = async () => {
    const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 }).lean()
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}
// genarate student id
export const generateStudentId = async(payload: TAcademicSemester) => {
    // first student genarted id
    const currentId =(await findLastStudent())|| (0).toString()
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0')
    incrementedId = `${payload.year}${payload.code}${incrementedId}`
    return incrementedId

}