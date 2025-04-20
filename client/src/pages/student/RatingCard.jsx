import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { useCourseReviewMutation, useGetUserCourseRatingByIdQuery } from "@/features/api/courseApi";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const RatingCard = ({courseId, setShowCard}) => {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0);

const [CourseReview, {data,isLoading, isSuccess, error}] = useCourseReviewMutation()
const {data:userCourseReview, isLoading:userCourseReviewIsLoading }= useGetUserCourseRatingByIdQuery(courseId)


const handleSubmitReviewAndRating = () => {
    CourseReview({
        courseId,
        rating,
        review
    })
}
 useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Thanks for your rating! your rating has been recorded")
        }
        if(error){
            toast.error(error.data?.message || "something is wrong ! Try again after some time")
        }

    }, [userCourseReview, isSuccess, error])

// if(userCourseReviewIsLoading) return <div>Loading...</div>
console.log("this is courseReview",userCourseReview)

    return (
        <Card className=" w-auto sm:w-[400px] shadow-lg  ">
            <CardHeader>
                <CardTitle>Rate this Course</CardTitle>
                <CardDescription>Leave a review and give a rating.</CardDescription>
                <CardDescription className="text-yellow-500 dark:text-yellow-300">You can only rate or review this course once !</CardDescription>
            </CardHeader>
            <CardContent>
                <Rating
                    value={userCourseReview?.userCourseRating?.rating || rating}
                    precision={0.5}
                    onChange={(e, newValue) => setRating(newValue)}
                    size="large"
                    sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#facc15', // Filled star color (e.g. yellow)
                        },
                        '& .MuiRating-iconEmpty': {
                          color: '#9ca3af', // Outline color for empty stars (e.g. white on dark bg)
                        },
                      }}
                />
                <textarea
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 border rounded mt-3 dark:bg-gray-900"
                    placeholder="Write your review..."
                    value={userCourseReview?.userCourseRating?.review ||review}
                />
            </CardContent>
            <CardFooter className="flex justify-between">
                <button onClick={()=>setShowCard(false)} className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-800">Cancel</button>
                <button onClick={handleSubmitReviewAndRating} className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">{isLoading? <span className="flex"><Loader/>Please Wait</span>: "Rate"}</button>
            </CardFooter>
        </Card>
    );
};

export default RatingCard;
