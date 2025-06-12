import React, { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Search, Download, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetAdminCoursePurchasedQuery, useGetAllPurchasedCourseQuery, useGetPurchasedCourseStatusQuery } from '@/features/api/paymentApi';
import { useGetCoursesQuery } from '@/features/api/courseApi';
import { useTheme } from '@/context/themeContext';
import { useSelector } from 'react-redux';
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"


const miniChartData = [
  { value: 10 }, { value: 15 }, { value: 12 }, { value: 18 }, { value: 14 }, { value: 19 }
];

const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const { theme } = useTheme()


  const { data } = useGetCoursesQuery()
  const { data: adminCourseData, isLoading: adminCourseIsLoading } = useGetAdminCoursePurchasedQuery()
  const { user } = useSelector((state => state.auth))


  useEffect(() => {
    if (adminCourseData && data) {

      const allCourses = data?.course
      const progress = adminCourseData?.courseProgress

      const result = progress.map((item) => {
        const course = allCourses.find((cou) => cou._id === item.courseId)


        if (!course || !course.lectures) {
          return { ...item, progressPercentage: "0%" }
        }

        const totalLectures = course.lectures.length
        const completedLectures = item.lectureProgress.length

        const totalPercentage = ((completedLectures / totalLectures) * 100).toFixed(2)

        return {
          ...item,
          progressPercentage: `${totalPercentage}%`
        }
      })

      setProgressData((e) => {
        return result;
      });

    }

  }, [data, adminCourseData])

  useEffect(() => {
  }, [progressData]);


  if (adminCourseIsLoading) return <AdminDashboardSkeleton/>



  const totalStudents = adminCourseData.data.reduce((total, item) => {
    return total + (item.courseId.enrolledStudents?.length || 0)
  }, 0)


  const totalRevenue = adminCourseData.data.reduce((acc, currentval) => {
    return acc + (currentval.amount || 0)
  }, 0)

  const mergedData = adminCourseData.data.map((user) => {
    const userProgress = progressData.find( // progressdata(progresspercentage) hr user ke lye find kr rahe
      (item) =>
        (item.userId) === (user.userId._id) &&
        (item.courseId) === (user.courseId._id)


    );

    return {
      ...user,
      progressPercentage: userProgress
        ? parseFloat(userProgress.progressPercentage)
        : 0, 
    };
  });



  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className='whitespace-normal break-all'>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 whitespace-normal break-all">Welcome Back, {user.username} 👋</h1>
            <p className="text-gray-500 dark:text-gray-200 mt-1">Track your performance and schedule</p>
          </div>
          
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-10  gap-6 ">
          {/* Performance Card */}
          <div className="col-span-9 lg:col-span-4">
            <div className='border dark:bg-gray-800 shadow-md rounded-md px-3 sm:px-7 py-4 max-h-[450px] overflow-y-auto '>
              <div className='flex text-gray-500 tracking-tight items-center justify-between  '>
                <h2 className='dark:text-gray-200'>Learners Progress</h2>
                <h2 className='dark:text-gray-200'>Top Performace </h2>
              </div>




              {mergedData.length > 0 ? (
                <div className="flex flex-col space-y-5">
                  {mergedData.map((user) => (
                    <div key={user._id} className="flex items-center gap-2">
                      <Avatar className="hover:cursor-pointer top-3">
                        <AvatarImage
                          src={user.userId?.photo || "https://github.com/shadcn.png"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-2 w-full">
                        <h2 className="flex justify-between">
                          {user.userId?.username || "Unknown User"}
                          <span>{user.progressPercentage || 0}%</span>
                        </h2>
                        <Progress value={user.progressPercentage || 0} />
                        <h2 className="flex justify-end">
                          {user.courseId?.category || "No Category"}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-red-500'>No users till now !</p>
              )}



            </div>
          </div>

          {/* Statistics */}
          <div className="col-span-9 lg:col-span-6 space-y-6">
            <div className="grid sm:grid-cols-2  gap-6">
              {/* New Students */}
              <div className="bg-white dark:bg-gray-800  rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-lime-500">New Students</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-lime-300">
                      2,543
                    </div>
                    <p className="text-sm text-gray-500 dark:text-lime-500">85% Increase in 20 Days</p>
                  </div>
                  <div className="h-16 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniChartData}>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={theme === "dark" ? "#34D399" : "#8B5CF6"}
                          fill={theme === "dark" ? "#10B981" : "#A78BFA"}
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Total Students */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-orange-500">Total Students</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-orange-300">{totalStudents}</div>
                    <p className="text-sm text-gray-500 dark:text-orange-500">45% Increase than before</p>
                  </div>
                  <div className="h-16 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniChartData}>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={theme === "dark" ? "#F59E0B" : "#8B5CF6"}   // Dark = Orange, Light = Indigo
                          fill={theme === "dark" ? "#F59E0B" : "#A78BFA"}
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {/* Total Sales*/}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold dark:text-amber-500">Total Sales</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-amber-300">{adminCourseData.data.length}</div>
                    <p className="text-sm text-gray-500 dark:text-amber-500">45% Increase than before</p>
                  </div>
                  <div className="h-16 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniChartData}>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={theme === "dark" ? "#FBBF24" : "#8B5CF6"}   // Dark = Amber, Light = Indigo
                          fill={theme === "dark" ? "#FBBF24" : "#A78BFA"}
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {/* Total Revenue*/}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-indigo-500">Total Revenue</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-indigo-300">₹{totalRevenue}</div>
                    <p className="text-sm text-gray-500 dark:text-indigo-500">45% Increase than before</p>
                  </div>
                  <div className="h-16 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniChartData}>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={theme === "dark" ? "#6366F1" : "#8B5CF6"}   // Dark = Indigo, Light = Indigo
                          fill={theme === "dark" ? "#6366F1" : "#A78BFA"}
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>


            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;












const AdminDashboardSkeleton=()=> {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="grid grid-cols-10 gap-6">
          {/* Learners Progress */}
          <Card className="col-span-9 lg:col-span-4 max-h-[450px] overflow-y-auto">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-4 w-24 ml-auto" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="col-span-9 lg:col-span-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Card key={idx} className="p-6">
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex items-end justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <Skeleton className="h-16 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
