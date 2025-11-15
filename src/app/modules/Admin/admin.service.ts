import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { AdminSearchableFields } from "./admin.constants"
import { TAdmin } from "./admin.interface"
import { Admin } from "./admin.model"
import AppError from "../../errors/AppError."
import httpStatus from 'http-status';
import { User } from "../user/user.model"



const getAllAdminIntoDB = async (query: Record<string, unknown>) => {
    const adminQuery = new QueryBuilder(Admin.find(), query)
        .search(AdminSearchableFields)
        .sort()
        .paginate()
        .filter()
        .fields()

    const result = await adminQuery.modelQuery
    return result
}

const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id)
    return result
}

const updateAdminInDB = async (id: string, payload: Partial<TAdmin>) => {
    const { name, ...remainingAdminData } = payload

    const modifiedUpdateData: Record<string, unknown> = { ...remainingAdminData }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name))
            modifiedUpdateData[`name.${key}`] = value
    }

    const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdateData, { new: true, runValidators: true })
    return result
}
const deleteAdminFromDB = async (id: string) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const deleteAdimin = await Admin.findByIdAndUpdate(id,
            { isDeleted: true },
            { new: true, session })

        if (!deleteAdimin) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete Admin')
        }

        const userid = deleteAdimin.user
        const deletedUser = await User.findByIdAndUpdate(
            userid,
            { isDeleted: true },
            { new: true, session }
        )


        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession()
        return deleteAdimin
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}

export const AdminServices = {
    getAllAdminIntoDB,
    getSingleAdminFromDB,
    updateAdminInDB,
    deleteAdminFromDB
}