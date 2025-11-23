import express from 'express'
import { UserControllers } from './user.controller';
import validationRequest from '../../middlwares/validateRequest';
import { studentValidations } from '../student/student.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlwares/auth';
import { UserValidation } from './user.validation';


const router = express.Router();

router.post('/create-student', auth('admin'),
    validationRequest(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent);


router.post('/create-amdin', validationRequest(createAdminValidationSchema), UserControllers.createAdmin)

router.post('/me', auth('student', 'admin', 'feculty'), UserControllers.getMe)

router.post('/change-status/:id', auth('admin'), validationRequest(UserValidation.changeStatusValidationSchma), UserControllers.changeStatus)

export const UserRoutes = router;