import { Schema, model, Document } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterCodes, AcademicSemesterNames, Months } from './academicSemester.contance';



// Mongoose Document interface extending TypeScript type
export interface IAcademicSemester extends TAcademicSemester, Document { }

// Mongoose Schema
const academicSemesterSchema = new Schema<IAcademicSemester>(
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

// Exporting the Mongoose model
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
