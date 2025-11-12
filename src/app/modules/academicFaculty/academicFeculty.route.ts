import express from 'express';
import validationRequest from '../../middlwares/validateRequest';
import { AcademicFecultyControllers } from './academicFeculty.controller';
import { AcademicFacultyValidation } from './academicFeculty.validation';

const router = express.Router();

// Create a new academic faculty
router.post(
    '/create-academic-feculty',
    validationRequest(AcademicFacultyValidation.createAcademicFecultyValidationSchema),
    AcademicFecultyControllers.createAcademicFeculty
);

// Get all academic faculties
router.get('/', AcademicFecultyControllers.getAllAcademicFecultys);

// Get a single academic faculty by id
router.get('/:fecultyId', AcademicFecultyControllers.getSingleAcademicFecculty);

// Update an academic faculty
router.patch('/:fecultyId',
    validationRequest(AcademicFacultyValidation.updateAcademicFecultyValidationSchema),
    AcademicFecultyControllers.updateAcademicFeculty
);

export const AcademicFacultyRoutes = router;
