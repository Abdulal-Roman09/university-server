import { model, Schema } from "mongoose";
import { AdminModel, TAdmin, TUserName } from "./admin.interface";
import { Gender } from "./admin.constants";

const userNameSchema = new Schema<TUserName>({
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
});

const adminSchema = new Schema<TAdmin>({
    id: { type: String, unique: true },
    user: { type: Schema.Types.ObjectId, unique: true, ref: 'User' },
    name: { type: userNameSchema },
    designation: { type: String },
    gender: { type: String, enum: Gender },
    dateOfBirth: { type: String },
    contactNo: { type: String },
    emergencyContactNo: { type: String },
    email: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    profileImage: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


//----------------- virtual for full name-----------------
adminSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
});

//------------------checking is user exist ------------------
adminSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Admin.findById(id)
    return existingUser
}

//-------------filter out deleted docoments-------------------
adminSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

adminSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

//--------------filter agrigate deleted docoments-----------
adminSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next()
})

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);    