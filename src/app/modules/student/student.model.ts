import { Schema, model } from 'mongoose';
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';


const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
});

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
  password: { type: String, required: true },
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
  isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
  isDeleteted: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true,
  versionKey: false,
});

// pre hook midddeller
studentSchema.pre('save', async function (next) {
  //  hash the password and save into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds))
  next()
})


// pre hook midddeller
studentSchema.post('save', function (doc, next) {
  // after hashed password hide from user 
  doc.password = ""
  next()
})
// creating a custom static method

studentSchema.statics.isUserExists = async function (id) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}


// creating a custom intance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };


export const Student = model<TStudent, StudentModel>('Student', studentSchema);
