import express from 'express';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';
import validationRequest from '../../middlwares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';


const router = express.Router();

// POST /create-academic-semester
router.post(
    '/create-academic-semester',
    validationRequest(createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester
);

export const AcademicSemesterRoutes = router;
