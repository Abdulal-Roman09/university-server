import { Schema } from "mongoose";
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
export const course = new Schema<TCourse>({
    title: { type: String },
    prefix: { type: String },
    code: { type: Number },
    credit: { type: Number },
    isDeleted: { type: Boolean },
    preRequisiteCourses: preRequisiteCoursesSchema,


})
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

