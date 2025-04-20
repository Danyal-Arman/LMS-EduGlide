import React from 'react'
import { Star, Users, Clock, BookOpen } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCourseAllReviewsAndRatingsQuery, useGetPublishedCourseQuery } from '@/features/api/courseApi';
import { Rating } from "@mui/material";

const CourseCard = ({course}) => {


console.log("this is course", course)





  return (
    <>
    <Link to={`/course-detail/${course._id}`}>
      <div className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:cursor-pointer">
        <div className='relative'>
          <img
            className="w-full h-44 lg:h-40 object-cover"
            src={course?.courseThumbnail}
            alt=""
          />
        </div>

        <div className='space-y-3 p-4'>
          <h2 className=' line-clamp-1 hover:underline font-bold'>{course?.courseTitle}</h2>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex gap-2 items-center'>
              <Avatar className="hover:cursor-pointer ">
                <AvatarImage src={course.creator?.photo || "https://github.com/shadcn.png"} className='h-8 rounded-full object-cover w-8' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h2>By {course.creator?.username}</h2>
            </div>
            <h2 className='bg-green-500 rounded-md px-2 text-white text-sm'>{course?.courseLevel}</h2>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-1'>
                <Rating
                                 value={course?.averageRating || 0}
                                 precision={0.5}
                                 size="small"
                                 readOnly
                                 sx={{
                                     '& .MuiRating-iconFilled': {
                                       color: '#facc15', // Filled star color (e.g. yellow)
                                     },
                                     '& .MuiRating-iconEmpty': {
                                       color: '#9ca3af', // Outline color for empty stars (e.g. white on dark bg)
                                     },
                                   }}
                             />
                             <span>({course?.averageRating})</span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='dark:text-gray-400 w-5' />
              <span className='dark:text-gray-400'>{course?.enrolledStudents?.length} students </span>
            </div>
          </div>
          <div className='bg-gray-700 h-[1px]'></div>
          <div className='flex justify-between items-center'>
            <h2 className='text-green-500 text-xl font-bold'>₹{course.coursePrice}</h2>
            <button className='bg-green-500 hover:bg-green-600 px-4 py-1 rounded-md text-white'> Enroll
            </button>
          </div>
        </div>

      </div>
      </Link>
    </>

  )
}
export default CourseCard


