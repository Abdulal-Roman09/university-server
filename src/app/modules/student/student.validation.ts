import { z } from 'zod';

// Name Validation
const userNameValidationSchema = z.object({
    firstName: z.string().nonempty({ message: 'First name is required' }),
    middleName: z.string().optional(),
    lastName: z.string().nonempty({ message: 'Last name is required' }),
});

// Guardian Validation
const guardianValidationSchema = z.object({
    fatherName: z.string().nonempty({ message: 'Father name is required' }),
    fatherOccupation: z.string().nonempty({ message: 'Father occupation is required' }),
    fatherContactNo: z.string().nonempty({ message: 'Father contact number is required' }),
    motherName: z.string().nonempty({ message: 'Mother name is required' }),
    motherOccupation: z.string().nonempty({ message: 'Mother occupation is required' }),
    motherContactNo: z.string().nonempty({ message: 'Mother contact number is required' }),
})
// Local Guardian Validation (optional)
const localGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
}).optional();

// Student Validation
const studentValidationSchema = z.object({
    id: z.string().nonempty({ message: 'Student ID is required' }),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
    dateOfBirth: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }),
    contactNo: z.string().nonempty({ message: 'Contact number is required' }),
    emergencyContactNo: z.string().nonempty({ message: 'Emergency contact number is required' }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string().nonempty({ message: 'Present address is required' }),
    permanentAddress: z.string().nonempty({ message: 'Permanent address is required' }),
    guardian: guardianValidationSchema.optional(),
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).optional(),
});

export default studentValidationSchema
