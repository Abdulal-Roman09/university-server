import { z } from 'zod';

const createAcademicFecultyValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Faculty name is required" })
    .min(2, "Faculty name must be at least 2 characters long")
    
  }),
});

const updateAcademicFecultyValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFecultyValidationSchema,
  updateAcademicFecultyValidationSchema
}