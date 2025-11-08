import express from 'express'
import { UserControllers } from './user.controller';
import validationRequest from '../../middlwares/validateRequest';
import { studentValidations } from '../student/student.validation';
const router = express.Router();

router.post(
    '/create-student',
    validationRequest(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent
);

export const UserRoutes = router;
