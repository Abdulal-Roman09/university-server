import express from 'express';
import { StudentControllers } from './student.controller';
import validationRequest from '../../middlwares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constance';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.patch('/:studentId', validationRequest(studentValidations.updateStudentValidationSchema),
    StudentControllers.updateStudent,
);

export const StudentRoutes = router;
