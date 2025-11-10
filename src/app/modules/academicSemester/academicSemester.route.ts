import express from 'express';
import { createAcademicSemesterValidationSchema, updateAcademicSemesterValidationSchema } from './academicSemester.validation';
import validationRequest from '../../middlwares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = express.Router();

// Create a new academic semester
router.post(
  '/create-academic-semester',
  validationRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester
);

// Get all academic semesters
router.get(
  '/',
  AcademicSemesterControllers.getAllAcademicSemesters
);

// Get a single academic semester by id
router.get(
  '/:id',
  AcademicSemesterControllers.getSingleAcademicSemester
);

// Update an academic semester
router.patch(
  '/:id',
  validationRequest(updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;
