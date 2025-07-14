import { Clock, PlayCircle, TrendingUp, BookmarkCheck, BarChart3 } from "lucide-react";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";
import ContinueCourse from "./ContinueCourse";
const MyLearning = ({data, isLoading}) => {
  const myCourses = true;

  if (isLoading) {
    return (
      <div className="min-h-[81vh] max-w-7xl  mx-auto px-6 py-10">
        <h2 className="text-center font-bold text-3xl mb-8 whitespace-normal break-all">Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  place-items-center  gap-5 lg:gap-12 xl:gap-5  px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((course) => (<CourseCardSkeleton />))}
        </div>
      </div>
    )
  }
  const user = data && data.user;
  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4 ">
          <header>
            <h1 className="text-2xl font-bold">My Learning</h1>
          </header>
        </div>
        <div className="space-y-6">

          <div className="justify-items-center  ">
            <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  gap-5 lg:gap-8   pt-2 pb-5  '>
              {user.enrolledCourses.length !== 0 ? (
                user.enrolledCourses.map((course) => <ContinueCourse course={course} key={course._id}  />)
              ) : (<h1 className="text-xl font-semibold">You are not enroled in any courses.</h1>)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyLearning;
