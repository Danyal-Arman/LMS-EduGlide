import CourseCard from "./CourseCard";
import { useGetTopCoursesQuery } from "@/features/api/courseApi";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { data, isLoading } = useGetTopCoursesQuery();
  const navigate = useNavigate();

  if (isLoading || !data) {
    return (
      <div className="min-h-[81vh] max-w-7xl  mx-auto px-6 py-10">
        <h2 className="text-center font-bold text-3xl mb-8 whitespace-normal break-all">
          Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center  gap-5 lg:gap-12 xl:gap-5  px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  const topCourses = data.courses;

  return (
    <>
      <div className="min-h-[81vh] max-w-7xl  mx-auto px-6 py-10 ">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl dark:text-white font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hand-picked courses from our expert instructors
            </p>
          </div>
          <button
            onClick={() => navigate(`/search-page?query`)}
            className="hidden md:block px-6 py-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors font-medium"
          >
            View All Courses
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-5 lg:gap-12 xl:gap-5  px-2 mt-8">
          {topCourses?.length > 0 ? (
            topCourses?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No published courses found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
