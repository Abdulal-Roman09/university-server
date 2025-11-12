import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Academic Department created successfully",
        data: result,
    });
});
const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDb()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All academic Department retrieved successfully',
        data: result
    })
})
const getSingleAcademicFecculty = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single academic Department retrieved successfully',
        data: result,
    });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(departmentId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department updated successfully',
        data: result,
    });
});

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicFecculty,
    updateAcademicDepartment
};
