import express from 'express';
import { AdminController } from './admin.controller';
import validationRequest from '../../middlwares/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';
import auth from '../../middlwares/auth';


const router = express.Router()

router.get('/', auth(), AdminController.getAllAdmins)
router.get('/:id', AdminController.getSingleAdmin)
router.patch('/:id', validationRequest(updateAdminValidationSchema),
    AdminController.updateAdmin)
router.delete('/:id', AdminController.deleteAdmin)

export const AdminRoutes = router