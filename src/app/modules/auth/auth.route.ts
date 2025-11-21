import express from 'express';
import validationRequest from '../../middlwares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constance';

const router = express.Router()

router.post('/login', validationRequest(AuthValidation.loginValidationSchema), AuthController.loginUser)

router.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.feculty, USER_ROLE.student), validationRequest(AuthValidation.changePasswordValidationSchema), AuthController.changePassword)

router.post('/refresh-token', validationRequest(AuthValidation.refreshTokenValidationSchema), AuthController.refreshToken)
export const AuthRouters = router