import express from 'express';
import validationRequest from '../../middlwares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router()

router.post('/login', validationRequest(AuthValidation.loginValidationSchema),)

export const AuthRouter = router