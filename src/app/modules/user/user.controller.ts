import { Request, Response, NextFunction } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;

    if (!studentData) {
      return res.status(400).json({
        success: false,
        message: 'Student data is required',
      });
    }

    const result = await UserServices.createStudentIntoDB(password, studentData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
