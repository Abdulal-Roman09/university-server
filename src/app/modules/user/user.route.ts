import express from 'express'
import { UserControllers } from './user.controller';
import validationRequest from '../../middlwares/validateRequest';
import { studentValidations } from '../student/student.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from './user.constance';

const router = express.Router();

router.post('/create-student', auth(USER_ROLE.admin),
    validationRequest(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent);


router.post('/create-amdin', validationRequest(createAdminValidationSchema), UserControllers.createAdmin)



export const UserRoutes = router;