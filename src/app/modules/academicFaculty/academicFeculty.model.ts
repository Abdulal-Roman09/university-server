import { model, Schema } from "mongoose";
import { TAcademicFeculty } from "./academicFeculty.interface";


const academicFecultSchema = new Schema<TAcademicFeculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

academicFecultSchema.pre('save', async function (next) {
    const isFecultyExist = await AcademicFeculty.findOne({ name: this.name })
    if (isFecultyExist) {
        throw new Error("This Academic Feculty is Exist")
    }
    next()
})

export const AcademicFeculty = model<TAcademicFeculty>('AcademicFeculty', academicFecultSchema)