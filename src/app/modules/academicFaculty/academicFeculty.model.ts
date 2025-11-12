import { model, Schema } from "mongoose";
import { TAcademicFeculty } from "./academicFeculty.interface";
import httpStatus from 'http-status';
import AppError from "../../errors/AppError.";

const academicFecultySchema = new Schema<TAcademicFeculty>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

academicFecultySchema.pre('save', async function (next) {
    const isFecultyExist = await AcademicFeculty.findOne({ name: this.name });
    if (isFecultyExist) {
        return next(new AppError(httpStatus.BAD_REQUEST, "This Academic Faculty already exists"));
    }
    next();
});

export const AcademicFeculty = model<TAcademicFeculty>('AcademicFeculty', academicFecultySchema);
