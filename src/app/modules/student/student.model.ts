import { Schema, model } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'First name is required'], trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: [true, 'Last name is required'], trim: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: { type: String, required: [true, 'Father occupation is required'] },
  fatherContactNo: { type: String, required: [true, 'Father contact number is required'] },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: { type: String, required: [true, 'Mother occupation is required'] },
  motherContactNo: { type: String, required: [true, 'Mother contact number is required'] },
}, { _id: false });

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required'] },
  occupation: { type: String, required: [true, 'Local guardian occupation is required'] },
  contactNo: { type: String, required: [true, 'Local guardian contact number is required'] },
  address: { type: String, required: [true, 'Local guardian address is required'] },
}, { _id: false });

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: [true, 'Student ID is required'], unique: true },
    name: { type: userNameSchema, required: [true, 'Name information is required'] },
    gender: { type: String, enum: ['male', 'female'], required: [true, 'Gender is required'] },
    dateOfBirth: { type: String },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: { type: String, required: [true, 'Emergency contact number is required'] },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    presentAddress: { type: String, required: [true, 'Present address is required'] },
    permanentAddress: { type: String, required: [true, 'Permanent address is required'] },
    guardian: { type: guardianSchema, required: false },
    localGuardian: { type: localGuardianSchema, required: false },
    profileImg: { type: String },
    isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const StudentModel = model<TStudent>('Student', studentSchema);
