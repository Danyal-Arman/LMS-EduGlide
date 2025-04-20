import razorpayInstance from "../config/razorpay.js";
import { coursePurchase } from "../models/purchaseCourse.model.js";
import { courseModel } from "../models/course.model.js";
import { lectureModel } from "../models/lecture.model.js";
import crypto from "crypto";
import { userModel } from "../models/user.model.js";
import mongoose from "mongoose";
import { CourseProgress } from "../models/courseProgress.js";
export const createOrder = async (req, res) => {
    try {

        // const userId = req.body.id
        // console.log("this is userId", userId)
        const courseId = req.body.courseId


        const purchasedCourse = await courseModel.findById(courseId)
        if (!purchasedCourse) {
            return res.status(400).json({
                success: false,
                message: "Course not found",
            })
        }

        // creating razorpay order
        const options = {
            amount: purchasedCourse.coursePrice * 100,
            currency: "INR",
        }

        const order = await razorpayInstance.orders.create(options)

        return res.status(200).json({
            success: true,
            order_id: order.id,
            key: process.env.RAZORPAY_KEY_ID,  // FOR FRONTEND
            amount: order.amount,
            currency: order.currency,
            message: "purchasedCourse order created successfully",
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error creating order"
        })
    }
}


export const verifyPayment = async (req, res) => {
    try {
        const { order_id, payment_id, signature, courseId, userId } = req.body;
        console.table({ order_id, payment_id, signature, courseId, userId })

        const secret = process.env.RAZORPAY_KEY_SECRET;

        const hmac = crypto.createHmac("sha256", secret)
        hmac.update(order_id + "|" + payment_id)
        const generatedSignature = hmac.digest("hex")

        if (generatedSignature !== signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            })
        }
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        const purchasedCourse = await courseModel.findById(courseId)
        if (!purchasedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        await coursePurchase.create({
            userId,
            courseId,
            paymentId: payment_id,
            amount: purchasedCourse.coursePrice,
            status: "success"
        })

        const populatePurchase = await coursePurchase.findOne({ paymentId: payment_id }).populate({ path: "courseId" })


        if (populatePurchase.courseId && populatePurchase.courseId.lectures.length > 0) {
            await lectureModel.updateMany(
                { _id: { $in: populatePurchase.courseId.lectures } },
                { $set: { isPreviewFree: true } }
            )
        }
        await populatePurchase.save();

        const updateUser = await userModel.findByIdAndUpdate(
            populatePurchase.userId,
            { $addToSet: { enrolledCourses: populatePurchase.courseId._id.toString() } },
            { new: true }
        )
      



        await courseModel.findByIdAndUpdate(
            populatePurchase.courseId._id,
            { $addToSet: { enrolledStudents: populatePurchase.userId } }, // Add user ID to enrolledStudents
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Payment verified, purchasedCourse enrolled successfully",
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error, payment verification failed"
        })
    }
}

export const getPurchasedCourseStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.body.id

        const course = await courseModel.findById(courseId).populate({ path: "creator" }).populate({ path: "lectures" })

        const purchasedCourse = await coursePurchase.findOne({ courseId, userId })

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }



        return res.status(200).json({
            success: true,
            course,
            purchasedCourse: !!purchasedCourse,// give true if purchased, false if not purchase
            message: "Your purchased purchasedCourse",
        })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error, Failed to get purchased purchasedCourse"
        })
    }
}

export const getAllPurchasedCourse = async (_, res) => {
    try {
        const purchasedCourse = await coursePurchase.find({
            status: "success",
        }).populate("courseId");
        if (!purchasedCourse) {
            return res.status(404).json({
                purchasedCourse: [],
            });
        }
        return res.status(200).json({
            purchasedCourse,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAdminCourseStatusPurchased = async (req, res) => {
    try {
        const userId = req.body.id

        const adminCourses = await courseModel.find({ creator: userId })
        if (!adminCourses) {
            return res.status(400).json({
                success: false,
                message: "Failed to get admin course"
            })
        }

        const adminCourseIds = adminCourses.map((course => course._id))
    
        const adminPurchasedCourses = await coursePurchase
            .find({
                status: "success",
                courseId: { $in: adminCourseIds }

            }).populate("courseId", "enrolledStudents category lectures").populate("userId", "photo username")

        const courseProgress = await CourseProgress.find({
            courseId: {$in: adminCourseIds}
        })


        return res.status(200).json({
            success: true,
            courseProgress,
            data: adminPurchasedCourses

        })
    } catch (error) {
        console.log(error)
    }
}
