import { CourseProgress } from "../models/courseProgress.js";
import { courseModel } from "../models/course.model.js";


export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.body.id

        const courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId");

        const course = await courseModel.findById(courseId).populate("lectures");

        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        if (!courseProgress) {
            return res.status(200).json({
                data: {
                    course,
                    progress: [],
                    completed: false
                }
            })
        }
        return res.status(201).json({
            data: {
                course,
                progress: courseProgress.lectureProgress,
                completed: courseProgress.completed
            },
            message :"hey this is success data of getcourseProgress"
        })
    } catch (error) {
        console.log(error)
    }
}
export const updateLectureProgress = async (req, res) => {
    try { 
        const { courseId, lectureId } = req.params;
        const userId = req.body.id;

        let courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            courseProgress = new CourseProgress({
                userId,
                courseId,
                completed: false,
                lectureProgress: [],
            })
        }

        // find the lecture with index in  lectureProgress in the course progress
        const lectureIndex = courseProgress.lectureProgress.findIndex(
            (lecture) => lecture.lectureId === lectureId);

        if (lectureIndex !== -1) {
            // if lecture already exist, update its status
            courseProgress.lectureProgress[lectureIndex].viewed = true;
        }
        else {
            courseProgress.lectureProgress.push({
                lectureId,
                viewed: true
            })
        }
        // by the above work every lecture in  lectureProgress is with viewed = true
        // if all lecture is complete
        const lectureProgressLength = courseProgress.lectureProgress.filter(
            (lectureProg) => lectureProg.viewed
        ).length;

        const course = await courseModel.findById(courseId);

        if (course.lectures.length === lectureProgressLength) courseProgress.completed = true;

        await courseProgress.save();
 
        return res.status(200).json({
            message: "Lecture progress updated successfully.",
        });
    } catch (error) { 
        console.log(error)
    }
}
export const markedCourseAsCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.body.id;

        const course = await  courseModel.findById(courseId)
        if(!course){
             return res.status(400).json({
                message: "Failed to find course"
             })
       }
       

        const courseProgress = await CourseProgress.findOne({ courseId, userId })
        if (!courseProgress) {
            return res.status(404).json({
                message: "Course progress not found.",
            })
        }



       
       courseProgress.lectureProgress.map((lectureProg) => (lectureProg.viewed = true)); // jitne bhi lecture h lecture progress me unsbko ko true kr rahe h
       courseProgress.completed = true; 
       await courseProgress.save();
        return res.status(200).json({message:"course marked as completed "})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error in marking course as completed.",
        })
    }
}

export const markedCourseAsInCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.body.id;

        const courseProgress = await CourseProgress.findOne({ courseId, userId })
        if (!courseProgress) {
            return res.status(404).json({
                message: "Course progress not found.",
            })
        }

        courseProgress.lectureProgress.map((lectureProg) => (lectureProg.viewed = false));// jitne bhi lecture h lecture progress me unsbko ko false kr rahe h
        courseProgress.completed = false;
        await courseProgress.save();
        return res.status(200).json({message:"course marked as incompleted "})

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error in marking course as incomplete.",
        })
    }
}


