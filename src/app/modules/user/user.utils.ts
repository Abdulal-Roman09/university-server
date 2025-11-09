import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// find  lest students
export const findLastStudent = async () => {
    const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 }).lean()
    return lastStudent?.id ? lastStudent.id : undefined
}
// genarate student id
export const generateStudentId = async (payload: TAcademicSemester) => {
    // first student genarted id
    let currentId = (0).toString()
    const lastStudentId = await findLastStudent()
    if (lastStudentId) {
        const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
        const lastStudentYear = lastStudentId?.substring(0, 4)
        const currentSemesterCode = payload.code;
        const currentYear = payload.year
        if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear
        ) {
            currentId = lastStudentId.substring(6)
        }
    }
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0')
    incrementedId = `${payload.year}${payload.code}${incrementedId}`
    return incrementedId

}