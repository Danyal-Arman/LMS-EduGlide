import React from 'react'
import { PlayCircle, Star, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Link } from 'react-router-dom';

const ContinueCourse = ({ course }) => {
    return (
        <Link to={`/course-progress/${course._id}`}>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"> */}

                <div className="sm:w-80 w-auto   overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <img
                        src={course.courseThumbnail || ` https://www.achieversit.com/management/uploads/course_image/python-img.jpg`}
                        alt="Courses"
                        className="h-44 w-full object-cover rounded-t-lg"
                    />
                    <div className="p-3 space-y-4">
                        <h1 className="truncate w-64 text-xl font-semibold">{course.courseTitle}</h1>
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-2'>
                            <Avatar className="hover:cursor-pointer ">
                                <AvatarImage src={course.creator?.photo || "https://github.com/shadcn.png"} className='h-8 rounded-full object-cover w-8' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h2>By {course.creator.username}</h2>
                            </div>  
                            <h2 className="bg-green-500 rounded-md px-2 text-white text-sm">{course.courseLevel}</h2>
                        </div>
                        <div className='flex justify-end'>
                            {/* <div className='flex items-center gap-1'>
                                <Star className='fill-yellow-400 text-yellow-400 w-5' />
                                <span>1</span>
                            </div> */}
                            <div className='flex items-center gap-1'>
                                <Users className='dark:text-gray-400 w-5' />
                                <span className='dark:text-gray-400'>{course.enrolledStudents.length} students </span>
                            </div>
                        </div>
                        <div className="px-4 ">
                            <button className="w-full flex items-center justify-center px-4 py-2 border border-green-600 dark:border-green-400 hover:bg-green-500 hover:text-white  text-green-600 dark:text-green-400 rounded-md mt-4 duration-300">
                                <PlayCircle className="h-4 w-4 mr-2" /> Continue Learning
                            </button>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </Link>
    )
}

export default ContinueCourse
