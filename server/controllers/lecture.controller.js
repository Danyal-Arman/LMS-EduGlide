import { courseModel } from "../models/course.model.js";
import { lectureModel } from "../models/lecture.model.js";
import { deleteVideoFromCloudinary } from "../utils/cloudinary.js";


export const createLecture = async (req, res) => {
    try {

        const { lectureTitle } = req.body;
        const { courseId } = req.params

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture Title is required"
            })
        }

        const lecture = await lectureModel.create({
            lectureTitle,
        })
        const course = await courseModel.findById(courseId)
        
 
       
       
        if (course) {
            course.lectures.push(lecture._id)
            await course.save()
        }
      
        return res.status(201).json({
            success: true,
            lecture,
            message: "Lecture created successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create Lecture "
        })
    }
};


export const getLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await courseModel.findById(courseId).populate("lectures")
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        return res.status(200).json({
            success: true,
            lectures: course.lectures,
            message: "lectures populated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get Lecture"
        })
    }
};

export const updateLecture = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;


        const lecture = await lectureModel.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Sorry! No lecture found "
            })
        }
        if (lecture) lecture.lectureTitle = lectureTitle;
        if (videoInfo?.videoURL) lecture.videoUrl = videoInfo.videoURL;
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId
        lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        const course = await courseModel.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id)
            await course.save()
        }
        return res.status(200).json({
            success: true,
            lecture,
            message: "Lecture updated successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update Lecture"
        })
    }
}

export const removeLecture = async (req, res) => {

    try {
        const { courseId, lectureId } = req.params;

        const lecture = await lectureModel.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Sorry! No lecture found "
            })
        }

        // deleting video from cloudinary
        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId)
        }

        const course = await courseModel.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        if (course.lectures.includes(lecture._id)) {
            course.lectures.pull(lecture._id)
            await course.save()
        }
        if(course.lectures.length === 0){
            course.isPublished = false;
            await course.save()
        }
       

        res.status(200).json({
            message: "Lecture remove successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to remove Lecture"
        })
    }
};

export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await lectureModel.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Sorry! No lecture found "
            })
        }
        return res.status(200).json({
            success: true,
            lecture,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to Find Lecture By Id "
        })
    }
}

