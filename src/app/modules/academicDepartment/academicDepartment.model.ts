import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";


const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFeculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFeculty'
    }
}, { timestamps: true })

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)