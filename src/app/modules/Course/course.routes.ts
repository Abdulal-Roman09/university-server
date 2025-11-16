import express from "express";
import validationRequest from "../../middlwares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";

const router = express.Router();

router.post(
    "/create-course",
    validationRequest(CourseValidations.createCourseValidationSchema),
    CourseController.createCourse
);

router.get("/", CourseController.getAllCourse);
router.get("/:id", CourseController.getSingleCourse);
router.delete("/:id", CourseController.deleteCourse);

export const CourseRouters = router;
