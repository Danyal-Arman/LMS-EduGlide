import express from "express"
import { createLecture, getLecture, getLectureById, removeLecture, updateLecture } from "../controllers/lecture.controller.js"
import isLoggedIn from "../middleware/isLoggedIn.js"

const router = express.Router();


router.post("/:courseId",isLoggedIn, createLecture)
router.get("/:courseId", isLoggedIn, getLecture)
router.post("/:courseId/:lectureId", isLoggedIn, updateLecture)
router.delete("/:courseId/:lectureId/remove", isLoggedIn, removeLecture)
router.get("/:courseId/:lectureId", isLoggedIn, getLectureById)


export default router;
