import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterCodes, AcademicSemesterNames, Months } from './academicSemester.constants';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError.';

// Mongoose Schema
const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            enum: AcademicSemesterNames,
            required: true,
        },
        code: {
            type: String,
            enum: AcademicSemesterCodes,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        startMonth: {
            type: String,
            enum: Months,
            required: true,
        },
        endMonth: {
            type: String,
            enum: Months,
            required: true,
        },
    },
    { timestamps: true }
);

academicSemesterSchema.pre('save', async function (next) {

    const isSemesterExists = await AcademicSemester.findOne({
        name: this.name,
        year: this.year
    })
    if (isSemesterExists) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Semester is alrady Exists')
    }
    next()
})

// Exporting the Mongoose model
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
