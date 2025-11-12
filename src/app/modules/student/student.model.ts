import { Schema, model } from 'mongoose';
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
}, { _id: false });

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
}, { _id: false });

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
}, { _id: false });

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, required: [true, 'user id is required'], unique: true, ref: 'User' },
  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: false },
  localGuardian: { type: localGuardianSchema, required: false },
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester'
  },
   academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment'
  },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true
  }
});

studentSchema.virtual('fullName').get(function (this: TStudent) {
  return `${this.name.firstName} ${this.name.middleName ? this.name.middleName + ' ' : ''}${this.name.lastName}`;
});


studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.statics.isUserExists = async function (id) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
