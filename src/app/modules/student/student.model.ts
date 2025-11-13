import { Schema, model } from 'mongoose';
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, trim: true },
}, { _id: false });

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, },
  fatherOccupation: { type: String, },
  fatherContactNo: { type: String, },
  motherName: { type: String, },
  motherOccupation: { type: String, },
  motherContactNo: { type: String, },
}, { _id: false });

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
}, { _id: false });

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, unique: true },
  user: { type: Schema.Types.ObjectId, required: [true, 'user id is required'], unique: true, ref: 'User' },
  name: { type: userNameSchema, },
  gender: { type: String, enum: ['male', 'female'], },
  dateOfBirth: { type: String },
  email: { type: String, unique: true },
  contactNo: { type: String, },
  emergencyContactNo: { type: String, },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  presentAddress: { type: String, },
  permanentAddress: { type: String, },
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

studentSchema.virtual('fullName').get(function () {
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
