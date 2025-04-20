import express from "express"
import  isLoggedIn  from "../middleware/isLoggedIn.js"
import upload from "../utils/multer.js"
import { createCourse, getAdminCourses, editAdminCourses, getCourseById, togglePublishCourse, removeCourse, getPublishedCourse, searchCourse, courseRatingAndReview, getUserCourseRatingById, getCourseAllReviewsAndRatings } from "../controllers/course.controller.js"
import route from "./courseProgress.route.js"
const router = express.Router()

router.post("/",isLoggedIn, createCourse)
router.get("/search",isLoggedIn, searchCourse)
router.get("/", isLoggedIn, getAdminCourses)
router.get("/get-published-course", getPublishedCourse)
router.put("/:courseId", isLoggedIn, upload.single("courseThumbnail"), editAdminCourses)
router.get("/:courseId", isLoggedIn, getCourseById) 
router.post("/:courseId/review", isLoggedIn, courseRatingAndReview)
router.get("/:courseId/review/user", isLoggedIn, getUserCourseRatingById)
router.get("/:courseId/all-reviews", isLoggedIn, getCourseAllReviewsAndRatings)
router.put("/:courseId/toggle-publish", isLoggedIn, togglePublishCourse)
router.delete("/:courseId/delete-course", isLoggedIn, removeCourse)
router.post("/create-order", isLoggedIn, createCourse)


export default router;