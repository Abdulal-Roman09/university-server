import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourse } from "./course.interface";


export const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourse>(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    },
);
export const courseSchema = new Schema<TCourse>({
    title: { type: String, unique: true },
    prefix: { type: String },
    code: { type: Number, unique: true },
    credit: { type: Number },
    isDeleted: { type: Boolean, default: false },
    preRequisiteCourses: [preRequisiteCoursesSchema],
})
export const Course = model<TCourse>('Course', courseSchema);

export const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true,
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
});
export const courseFaculty = model<TCourseFaculty>('CourseFeculty', courseFacultySchema)

