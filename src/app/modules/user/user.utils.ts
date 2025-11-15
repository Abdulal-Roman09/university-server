import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// Admin ID
export const findLastAdminId = async () => {
    const lastAdmin = await User.findOne(
        {
            role: 'admin',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

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
export const generatedAdminid = async () => {
    let currentId = (0).toString()
    const lastAdminId = await findLastAdminId()

    if (lastAdminId) {
        currentId = lastAdminId.substring(2)
    }
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0')
    incrementedId = `A-${incrementedId}`
    return incrementedId
}