import { useGetCoursesQuery } from '@/features/api/courseApi';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton"



const CourseTable = () => {
const navigate = useNavigate();
const {data, isLoading}= useGetCoursesQuery({refetchOnMountOrArgChange:true});


if(isLoading)  return <CourseTableSkeleton/>
   

    return (
       
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 w-full overflow-hidden">
    <div className="w-full ">
        <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 whitespace-normal break-normal">
                Course Management
            </h1>
            <button
                onClick={() => navigate('/admin/course/create')}
                className="bg-black dark:bg-gray-700 text-white rounded-md px-5 py-2 font-bold mb-5 hover:bg-gray-800 dark:hover:bg-gray-600 transition whitespace-normal break-all"
            >
                Create new Course
            </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {data?.course?.map((course) => (
                            <tr key={course._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                        {course.courseTitle}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-200">
                                        ₹{course?.coursePrice || "NA"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2  py-1 inline-flex text-xs leading-5 font-semibold rounded-lg ${
                                            course.isPublished === false  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                        }`}
                                    >
                                        {course.isPublished === false ?  "unpublished":"published"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors">
                                        <lord-icon
                                            onClick={()=>navigate(`/admin/course/${course._id}`)}
                                            src="https://cdn.lordicon.com/fikcyfpp.json"
                                            trigger="hover"
                                            stroke="bold"
                                            style={{ width: '40px', height: '50px' }}
                                        ></lord-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

    );
}

export default CourseTable;







const CourseTableSkeleton = ()=> {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 w-[85%] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
  
          {/* Table skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {["Title", "Price", "Status", "Action"].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-32 rounded" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-4 w-20 rounded" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Skeleton className="h-10 w-10 rounded-full" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }