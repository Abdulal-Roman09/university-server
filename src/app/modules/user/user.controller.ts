import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body;

        // const zodParseData = studentValidationSchema.parse(studentData)

        if (!studentData) {
            return res.status(400).json({
                success: false,
                message: 'Student data is required',
            });
        }

        const result = await UserServices.createStudentIntoDB(password,studentData);

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error?.message || 'Failed to create student',
            error: error,
        });
    }
};

export const UserControllers = {
    createStudent,
};