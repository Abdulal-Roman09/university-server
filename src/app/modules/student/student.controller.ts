import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

// Get All Students
const getAllStudents = catchAsync(async (req, res) => {

  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Students retrieved successfully',
    data: result,
  })
})

// Get Single Student
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Student not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });

})

// Delete Student
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Student not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });

})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
