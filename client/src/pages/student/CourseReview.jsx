import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCourseAllReviewsAndRatingsQuery } from '@/features/api/courseApi';
import { Rating } from '@mui/material';
import { toast } from 'sonner';



const CourseReview = ({ courseId }) => {

    const { data, isLoading, isSuccess, error } = useGetCourseAllReviewsAndRatingsQuery(courseId)

    if (isLoading) return <div>loading...</div>

    const sortData = [...data?.Ratings.courseRating].filter((rating)=> rating.review.trim() !=="").sort((a,b) => (b.rating - a.rating))


   

    return (
        <div>
            {sortData.map((rating, index) =>
                <div key={index} className='flex bg-gray-200 dark:bg-gray-600  rounded-md p-2 my-5'>
                    <Avatar className="hover:cursor-pointer ">
                        <AvatarImage src={rating.user.photo || `https://github.com/shadcn.png`} className='h-8 rounded-full object-cover w-8' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex relative flex-col w-full '>
                        <div className='flex items-center  justify-between '>
                            <h2 className='font-semibold'>{rating.user.username}</h2>
                            <Rating
                                value={rating.rating}
                                precision={0.5}
                                size="small"
                                readOnly
                            />
                        </div>
                        <p >{rating.review} </p>
                    </div>
                </div>)}

        </div>
    )
}

export default CourseReview
