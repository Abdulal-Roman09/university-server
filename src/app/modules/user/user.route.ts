import express from 'express'
import { UserControllers } from './user.controller';
import validation from '../../middlwares/validateRequest';
import { studentValidations } from '../student/student.validation';
const router = express.Router();

router.post(
    '/create-student',
    validation(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent
);

export const UserRoutes = router;
