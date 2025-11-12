import { TAcademicSemesterCode, TAcademicSemesterName, TacademicSemesterNameCodeMapper, TMonths } from "./academicSemester.interface";

// Month type array
export const Months: TMonths[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

// AcademicSemester enum arrays
export const AcademicSemesterCodes: TAcademicSemesterCode[] = ['01', '02', '03'];
export const AcademicSemesterNames: TAcademicSemesterName[] = ['Autom', 'Summer', 'Fall'];

export const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
    Autom: '01',
    Summer: '02',
    Fall: '03'
}