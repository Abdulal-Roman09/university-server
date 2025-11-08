import { academiSemesterNameCodeMapper } from "./academicSemester.contance";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";


const createAcademicSemeterIntoDB = async (payload: TAcademicSemester) => {

    if (academiSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid semester code')
    }

    const result = await AcademicSemester.create(payload)
    return result

};
export const AcademicsemesterServices = {
    createAcademicSemeterIntoDB
};