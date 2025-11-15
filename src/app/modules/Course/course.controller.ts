import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Course } from "./course.model";
import { CourseServices } from "./course.service";
import httpStatus from "http-status";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is created successfully",
        data: result,
    });
});

const getAllCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses are retrieved successfully",
        data: result,
    });
});

const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single course retrieved successfully",
        data: result,
    });
});

export const CourseController = {
    createCourse,
    getAllCourse,
    getSingleCourse,
};
