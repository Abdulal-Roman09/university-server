import express from 'express';
import { AdminController } from './admin.controller';
import validationRequest from '../../middlwares/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';


const router = express.Router()

router.get('/', AdminController.getAllAdmins)
router.get('/:id', AdminController.getSingleAdmin)
router.patch('/:id',
    validationRequest(updateAdminValidationSchema),
    AdminController.updateAdmin)

export const AdminRoutes = router