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

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({ name: this.name })
    if (isDepartmentExist) {
        throw new Error("This Academic Department is Exist")
    }
    next()
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)