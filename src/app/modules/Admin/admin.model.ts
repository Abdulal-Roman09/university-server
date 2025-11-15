import { Schema } from "mongoose";
import { TAdmin, TUserName } from "./admin.interface";
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

// virtual for full name
adminSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`.trim();
});