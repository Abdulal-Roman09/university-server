
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { AcademicsemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {

    const result = await AcademicsemesterServices.createAcademicSemeterIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'academicSemester is created successfully',
        data: result,
    });
});

export const AcademicSemesterControllers = {
    createAcademicSemester
};
