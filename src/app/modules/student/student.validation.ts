import { z } from 'zod';

// Name Validation
const createuserNameValidationSchema = z.object({
    firstName: z.string().nonempty({ message: 'First name is required' }),
    middleName: z.string().optional(),
    lastName: z.string().nonempty({ message: 'Last name is required' }),
});

// Guardian Validation
const createguardianValidationSchema = z.object({
    fatherName: z.string().nonempty({ message: 'Father name is required' }),
    fatherOccupation: z.string().nonempty({ message: 'Father occupation is required' }),
    fatherContactNo: z.string().nonempty({ message: 'Father contact number is required' }),
    motherName: z.string().nonempty({ message: 'Mother name is required' }),
    motherOccupation: z.string().nonempty({ message: 'Mother occupation is required' }),
    motherContactNo: z.string().nonempty({ message: 'Mother contact number is required' }),
})

// Local Guardian Validation (optional)
const createlocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
}).optional();

// Student Validation
const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().nonempty({ message: "password is required " }),
        student: z.object({
            name: createuserNameValidationSchema,
            gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
            dateOfBirth: z.string().optional(),
            email: z.string().email({ message: 'Invalid email address' }),
            contactNo: z.string().nonempty({ message: 'Contact number is required' }),
            emergencyContactNo: z.string().nonempty({ message: 'Emergency contact number is required' }),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().nonempty({ message: 'Present address is required' }),
            permanentAddress: z.string().nonempty({ message: 'Permanent address is required' }),
            guardian: createguardianValidationSchema.optional(),
            localGuardian: createlocalGuardianValidationSchema,
            profileImg: z.string().optional(),
            admissionSemester: z.string(),
            academicDepartment: z.string(),
        })
    })
});

// Name Validation (optional for update)
const updateUserNameValidationSchema = z.object({
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
}).optional();

// Guardian Update Validation (optional for update)
const updateGuardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
}).optional();

// Local Guardian Validation (optional)
const updateLocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
}).optional();

// Update Student Validation (all optional)
const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema,
            gender: z.enum(['male', 'female']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email({ message: 'Invalid email address' }).optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            guardian: updateGuardianValidationSchema,
            localGuardian: updateLocalGuardianValidationSchema,
            profileImg: z.string().optional(),
            admissionSemester: z.string().optional(),
            academicDepartment: z.string().optional(),
        }).optional(),
    }),
});


export const studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema
}
