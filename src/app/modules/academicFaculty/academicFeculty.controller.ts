import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFecultyServices } from "./academicFeculty.service";
import httpStatus from 'http-status';

const createAcademicFeculty = catchAsync(async (req, res) => {
    const result = await AcademicFecultyServices.createAcademicFecultyIntoDb(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Academic Faculty created successfully",
        data: result,
    });
});
const getAllAcademicFecultys = catchAsync(async (req, res) => {
    const result = await AcademicFecultyServices.getAllAcademicFecultyFromDb()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All academic feculty retrieved successfully',
        data: result
    })
})
const getSingleAcademicFecculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicFecultyServices.getSingleAcademicFecultyFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single academic feculty retrieved successfully',
        data: result,
    });
});
const updateAcademicFeculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicFecultyServices.updateAcademicFecultyIntoDb(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic feculty updated successfully',
        data: result,
    });
});

export const AcademicFecultyControllers = {
    createAcademicFeculty,
    getAllAcademicFecultys,
    getSingleAcademicFecculty,
    updateAcademicFeculty
};
