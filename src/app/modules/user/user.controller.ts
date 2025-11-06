import { Request, Response } from 'express';
import { StudentServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body;
        const result = await StudentServices.createStudentIntoDB(studentData);

        res.status(200).json({
            success: true,
            message: 'Student is created succesfully',
            data: result,
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.message || 'Failed to create student',
            error: err,
        });
    }
};

export const UserControllers = {
    createStudent,
};