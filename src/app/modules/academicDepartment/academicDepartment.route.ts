import express from 'express';
import validationRequest from '../../middlwares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';



const router = express.Router();

// Create a new academic faculty
router.post(
    '/create-academic-department',
    validationRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.createAcademicDepartment
);

// Get all academic faculties
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

// Get a single academic faculty by id
router.get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicFecculty);

// Update an academic faculty
router.patch('/:departmentId',
    validationRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
