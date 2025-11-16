import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFeculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { CourseRouters } from "../modules/Course/course.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AuthRouters } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  }, {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-feculties',
    route: AcademicFacultyRoutes,
  }, {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  }, {
    path: '/admin',
    route: AdminRoutes
  }
  , {
    path: '/course',
    route: CourseRouters
  },
  , {
    path: '/auth',
    route: AuthRouters
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
