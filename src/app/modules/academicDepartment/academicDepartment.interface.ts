import { Types } from "mongoose"


export type TAcademicDepartment = {
    name: string;
    academicFeculty: Types.ObjectId
}