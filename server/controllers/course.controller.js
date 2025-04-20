import { courseModel } from "../models/course.model.js";
import { lectureModel } from "../models/lecture.model.js";
import { deletePhotoFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
// 

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "course title and category are required",
            });
        }
        const course = await courseModel.create({
            courseTitle,
            category,
            creator: req.body.id,
        })
        return res.status(201).json({
            course,
            message: "Course created successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export const searchCourse = async (req, res) => {
    try {

        const { query = "", categories = "", sortByPrice = "" } = req.query
        const filterCriteria = { isPublished: true, }

        if (query) {
            filterCriteria.$or = [
                { courseTitle: { $regex: query, $options: "i" } },
                { subTitle: { $regex: query, $options: "i" } },
            ];
        }
        if (categories) {
             filterCriteria.category = { 
                $regex: `^${categories.trim()}$`,
                $options: "i" 
            }

        }
       
        const sortOption = {}
        if (sortByPrice === "low") {
            sortOption.coursePrice = 1 //sort by price in ascending
        }

        else if (sortByPrice === "high") {
            sortOption.coursePrice = -1 // descending       
        }
        const courses = await courseModel.find(filterCriteria)
            .populate({ path: "creator", select: "username photo" }).sort(sortOption)

        if (!courses || courses.length === 0) {
            return res.status(400).json({
                message: "No courses found matching the criteria."
            })
        }

        return res.status(200).json({
            success: true,
            courses: courses || []
        })


    } catch (error) {
        console.log(error)
    }
}


export const getAdminCourses = async (req, res) => {
    try {
        const userId = req.body.id; // user id h 
        const course = await courseModel.find({ creator: userId }) // finding courses linked to the userid
        // from here find return array of courses that matches that belongs to that user

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        };
        return res.status(200).json({
            success: true,
            course,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

export const editAdminCourses = async (req, res) => {
    try {
        const { courseTitle, subTitle, category, description, courseLevel, coursePrice } = req.body;

        const thumbnail = req.file;
        const courseId = req.params.courseId;


        const course = await courseModel.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        if (!thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail is required"
            })
        }


        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0]
                await deletePhotoFromCloudinary(publicId) // delete the old photo from cloudinary
            }
        }
        //uploading thumbnail to cloudinary
        const courseThumbnail = await uploadMedia(thumbnail?.path) // upload the new photo

        const courseUpdate = await courseModel.findByIdAndUpdate(courseId, { courseTitle, subTitle, category, description, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url }, { new: true })
        return res.status(200).json({
            success: true,
            course: courseUpdate,
        })


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Failed to update course"
        })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        return res.status(200).json({
            success: true,
            course,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to get course"
        })
    }
}

// published or unpublished course

export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query

        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            }) 
        }
        if (publish === "true" && course.lectures.length === 0) {
            return res.status(400).json({

                success: false,
                message: "To published course , you must have at add at least one lecture"
            }) 
        }
        course.isPublished = publish === "true"; //"true" its string cauz its coming from frontend  
        await course.save();

        return res.status(200).json({
            success: true,
            message: `course ${course.isPublished ? "Published" : "Unpublished"} successfully`,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to toggle course publish status"
        })
    }
}


export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        // find dega sara lecture related to that course
        const courseLectures = await lectureModel.find({ _id: { $in: course.lectures } });

        for (const lecture of courseLectures) {
            if (lecture.publicId) {
                await deleteVideoFromCloudinary(lecture.publicId)
            }
        }
        await lectureModel.deleteMany({ _id: { $in: course.lectures } })

        const courseDeleted = await courseModel.findByIdAndDelete(courseId);
        return res.status(200).json({
            courseDeleted,
            success: true,
            message: "Course deleted successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to Remove Course"
        })
    }
}

export const getPublishedCourse = async (_, res) => {
    try {
        const publishedCourse = await courseModel.find({ isPublished: true }).populate({ path: "creator", select: "username photo" });
        if (!publishedCourse) {
            return res.status(404).json({
                success: false,
                message: "Published course not found"
            })
        }
        return res.status(200).json({
            success: true,
            publishedCourse,
            message: "Published course found successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to get published course"
        })
    }
}

export const courseRatingAndReview =async (req, res)=>{
    try {
        const {courseId} = req.params
        const userId= req.body.id
        const {rating, review} = req.body
   
        const course = await courseModel.findById(courseId)
   
        
        
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Failed to find course in courseReview"
               })
           }
           const existingReviewAndRating = course.courseRating.find((data)=> data.user.toString() === userId)
       
   if(existingReviewAndRating ){
      return res.status(400).json({
       success:false,
       message:"You have already reviewed this course"
      })
   }
   
   const newReviewAndRating = {
       user: userId,
       course: courseId,
       rating, 
       review
   }
   course.courseRating.push(newReviewAndRating)
   await course.save();
   return res.status(200).json({
       message:"your review has been recorded ! Thanks for your rating "
   })
        
    } catch (error) {
        console.log(error)
    }
    
}

export const getUserCourseRatingById = async(req, res)=>{
try {
    const userId = req.body.id
    const {courseId}= req.params

const course = await courseModel.findById(courseId)

const userCourseRating = course.courseRating.find((data)=> data.user.toString() === userId)

if(!userCourseRating){
    return res.status(400).json({
        message:"No rating is found "
    })
}

return res.status(200).json({
  success: true,
  userCourseRating,
})

} catch (error) {
    console.log(error)
}
}

export const getCourseAllReviewsAndRatings = async(req, res)=>{
try {
    const {courseId}= req.params

const course = await courseModel.findById(courseId).select("courseRating").populate("courseRating.user", "username photo")

if(!course){
    return res.status(400).json({
        success: true,
        message:"No course found and hence failed to find course review and rating"
    })
}
return res.status(200).json({
    success:true,
    Ratings:course
})

} catch (error) {
    console.log(error)
}
}


