import express from 'express';
import isLoggedIn from '../middleware/isLoggedIn.js';
import { getCourseProgress, markedCourseAsCompleted, markedCourseAsInCompleted, updateLectureProgress } from '../controllers/courseProgress.controllers.js';


const route = express.Router();

route.get("/:courseId",isLoggedIn, getCourseProgress)
route.put("/:courseId/update-lecture-progress/:lectureId",isLoggedIn, updateLectureProgress)
route.put("/:courseId/mark-course-completed", isLoggedIn, markedCourseAsCompleted)
route.put("/:courseId/mark-course-incompleted", isLoggedIn, markedCourseAsInCompleted)

export default route;  