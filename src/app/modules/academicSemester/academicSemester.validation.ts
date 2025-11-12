import { z } from 'zod';
import {
    TAcademicSemesterCode,
    TAcademicSemesterName,
    TMonths,
} from './academicSemester.interface';
import {
    Months,
    AcademicSemesterCodes,
    AcademicSemesterNames,
} from './academicSemester.constants';

// Create AcademicSemester Validation Schema
export const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(AcademicSemesterNames as [TAcademicSemesterName, ...TAcademicSemesterName[]]),
        code: z.enum(AcademicSemesterCodes as [TAcademicSemesterCode, ...TAcademicSemesterCode[]]),
        year: z.string(),
        startMonth: z.enum(Months as [TMonths, ...TMonths[]]),
        endMonth: z.enum(Months as [TMonths, ...TMonths[]]),
    }),
});

// Update AcademicSemester Validation Schema
export const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(AcademicSemesterNames as [string, ...string[]]).optional(),
        year: z.string().optional(),
        code: z.enum(AcademicSemesterCodes as [string, ...string[]]).optional(),
        startMonth: z.enum(Months as [string, ...string[]]).optional(),
        endMonth: z.enum(Months as [string, ...string[]]).optional(),
    }),
});
