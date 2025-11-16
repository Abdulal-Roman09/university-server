import { z } from 'zod';

const PreRequisiteCourseValidationSchema = z.object({
    course: z.string().nonempty(),
});

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().nonempty(),
        prefix: z.string().nonempty(),
        code: z.number(),
        credit: z.number(),
        preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),

    }),
});


const updateCourseValidationSchema=createCourseValidationSchema.partial()


const facultiesWithCourseValidationSchema = z.object({
    body: z.object({
        faculties: z.array(z.string()),
    }),
});

export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    facultiesWithCourseValidationSchema,
};