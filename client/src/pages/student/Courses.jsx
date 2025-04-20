import React from 'react'
import CourseCard from './CourseCard'
import { useGetPublishedCourseQuery } from '@/features/api/courseApi'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import CourseCardSkeleton from '@/components/CourseCardSkeleton';
import { useNavigate } from 'react-router-dom';


const Courses = () => {
  const { data, isLoading, error } = useGetPublishedCourseQuery();
  const navigate = useNavigate()

  const courseWithAverageRatings = data?.publishedCourse.map((course) => {
    const ratings = course.courseRating || []; // array of ratings
    console.log("this is rating", ratings)
  
    const totalRatings = ratings.length;
    console.log("this is total rating",totalRatings)
  
    const sumOfRatings = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    console.log("sum of rating",sumOfRatings)
  
    const averageRating = totalRatings === 0 ? 0 : Number((sumOfRatings / totalRatings).toFixed(1));
  
    return {
      ...course,
      averageRating, // ✅ add this new field
    };
  });
  console.log(data)
   
  console.log("he he",courseWithAverageRatings) 
  
  if (isLoading) {
    return (
      <div className="min-h-[81vh] max-w-7xl  mx-auto px-6 py-10">
        <h2 className="text-center font-bold text-3xl mb-8 whitespace-normal break-all">Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center  gap-5 lg:gap-12 xl:gap-5  px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (<CourseCardSkeleton key={index} />))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-[81vh] max-w-7xl  mx-auto px-6 py-10 ">
        <div className='flex justify-center gap-10 items-center dark:from-gray-900 dark:to-gray-800'>
          <h2 className="text-center font-bold text-3xl  whitespace-normal break-all">Courses</h2>
          <button onClick={() => navigate(`/search-page?query`)} className='bg-blue-100 text-blue-600 px-2 py-1 rounded-xl '>Explore</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-5 lg:gap-12 xl:gap-5  px-2 mt-8">
          {courseWithAverageRatings?.length > 0 ? (courseWithAverageRatings?.map((course) => (<CourseCard key={course._id} course={course} />))) : (<p className="col-span-full text-center text-gray-500">No published courses found.</p>
          )}
        </div>
      </div>

    </>
  )
}

export default Courses
