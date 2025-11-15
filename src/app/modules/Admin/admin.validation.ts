import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constants';

// ------------------ UserName Validation ------------------
const createUserNameValidationSchema = z.object({
    firstName: z.string().nonempty().min(1, "First name is required").max(20),
    middleName: z.string().min(1, "Middle name is required").max(20),
    lastName: z.string().nonempty().min(1, "Last name is required").max(20),
});

// ------------------ Create Admin Validation ------------------
export const createAdminValidationSchema = z.object({
    body: z.object({
        password: z.string().nonempty("Password is required").max(20),
        admin: z.object({
            designation: z.string().nonempty("Designation is required"),
            name: createUserNameValidationSchema,
            gender: z.enum([...Gender] as [string, ...string[]]),
            dateOfBirth: z.string().nonempty("Date of birth is required"),
            email: z.string().email("Invalid email").nonempty("Email is required"),
            contactNo: z.string().nonempty("Contact number is required"),
            emergencyContactNo: z.string().nonempty("Emergency contact is required"),
            bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]),
            presentAddress: z.string().nonempty("Present address is required"),
            permanentAddress: z.string().nonempty("Permanent address is required"),
            profileImg: z.string().nonempty("Profile image is required"),
        }),
    }),
});


// ------------------ Update Admin Validation ------------------
const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(3).max(20).optional(),
    middleName: z.string().min(3).max(20).optional(),
    lastName: z.string().min(3).max(20).optional(),
});

export const updateAdminValidationSchema = z.object({
    body: z.object({
        admin: z.object({
            name: updateUserNameValidationSchema.optional(),
            designation: z.string().max(30).optional(),
            gender: z.enum([...Gender] as [string, ...string[]]).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            profileImg: z.string().optional(),
        }),
    }),
});

export const AdminValidations = {
    createAdminValidationSchema,
    updateAdminValidationSchema,
};
