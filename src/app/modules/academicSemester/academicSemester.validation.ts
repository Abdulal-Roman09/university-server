import { z } from 'zod';
import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from './academicSemester.interface';
import { Months, AcademicSemesterCodes, AcademicSemesterNames } from './academicSemester.contance';

// Zod schema for creating AcademicSemester
export const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(AcademicSemesterNames as [TAcademicSemesterName, ...TAcademicSemesterName[]],),
        code: z.enum(AcademicSemesterCodes as [TAcademicSemesterCode, ...TAcademicSemesterCode[]],),
        year: z.string(),
        startMonth: z.enum(Months as [TMonths, ...TMonths[]],),
        endMonth: z.enum(Months as [TMonths, ...TMonths[]],),
    }),
});

// Exporting type for TypeScript usage
export type AcademicSemesterValidation = typeof createAcademicSemesterValidationSchema;
