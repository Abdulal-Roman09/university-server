import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError.';


const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
        req.file,
        password,
        studentData);
        
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Student created successfully',
        data: result,
    });
});

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    if (!adminData) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Student data is required',
        });
    }
    const result = await UserServices.createAdminIntoDB(password, adminData);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Student created successfully',
        data: result,
    });
});

const getMe = catchAsync(async (req, res) => {

    const { userId, role } = req.user

    const result = await UserServices.getMe(userId, role)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'get me  successfully',
        data: result,
    });
});

const changeStatus = catchAsync(async (req, res) => {

    const { id } = req.params

    const result = await UserServices.changeStatus(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'update status successfully',
        data: result,
    });
});

export const UserControllers = {
    createStudent,
    createAdmin,
    getMe,
    changeStatus
};
