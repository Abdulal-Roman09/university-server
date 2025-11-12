import { model, Schema } from "mongoose";
import { TAcademicFeculty } from "./academicFeculty.interface";

const academicFecultSchema = new Schema<TAcademicFeculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

export const AcademicFeculty = model<TAcademicFeculty>('AcademicFeculty', academicFecultSchema)