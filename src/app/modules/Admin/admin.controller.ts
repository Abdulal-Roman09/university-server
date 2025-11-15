import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";
import httpStatus from 'http-status';

const getAllAdmins = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllAdminIntoDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is updated succesfully',
        data: result,
    });
})

const getSingleAdmin = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await AdminServices.getSingleAdminFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get single update successfully',
        data: result
    })
})

const updateAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { admin } = req.body;
    const result = await AdminServices.updateAdminInDB(id, admin)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is Update',
        data: result
    })
})

const deleteAdmin = catchAsync(async (req, res) => {

    const { id } = req.params
    const result = await AdminServices.deleteAdminFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is Delete',
        data: result
    })
})

export const AdminController = {
    getAllAdmins,
    updateAdmin,
    getSingleAdmin,
    deleteAdmin
}