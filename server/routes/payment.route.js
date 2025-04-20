import express from "express"
import isLoggedIn from "../middleware/isLoggedIn.js"
import { createOrder, getAdminCourseStatusPurchased, getAllPurchasedCourse,  getPurchasedCourseStatus, verifyPayment } from "../controllers/purcahseCourse.controller.js"

const router = express.Router()
 
router.post("/create-order", isLoggedIn, createOrder)
router.post("/verify-payment", isLoggedIn, verifyPayment)
router.get("/", isLoggedIn, getAllPurchasedCourse)
router.get("/admin-course-purchased", isLoggedIn, getAdminCourseStatusPurchased)
router.get("/:courseId", isLoggedIn, getPurchasedCourseStatus)

export default router; 