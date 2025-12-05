import { PlayCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SeoAvatar from "@/components/SeoAvatar";

const ContinueCourse = ({ course }) => {
  return (
    <Link to={`/course-progress/${course._id}`}>
      <div className="w-auto sm:w-80   overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <img
          src={
            course.courseThumbnail ||
            ` https://www.achieversit.com/management/uploads/course_image/python-img.jpg`
          }
          alt="Courses"
          className="h-44 w-full object-cover rounded-t-lg"
        />
        <div className="p-3 space-y-4">
          <h1 className="truncate  text-xl font-semibold">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SeoAvatar
                src={course.creator?.photo || "https://github.com/shadcn.png"}
                name={course.creator?.username}
                fallbackText="CN"
              />
              <h2>By {course.creator.username}</h2>
            </div>
            <h2 className="bg-blue-100 rounded-md px-2 text-blue-800 text-sm">
              {course.courseLevel}
            </h2>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-1">
              <Users className="dark:text-gray-400 w-5" />
              <span className="dark:text-gray-400">
                {course.enrolledStudents.length} students{" "}
              </span>
            </div>
          </div>
          <div className="px-4 ">
            {/* <button className="w-full flex items-center justify-center px-4 py-2 border hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:text-white  text-purple-900 dark:text-white rounded-md mt-4 duration-300"> */}
            <button className="w-full flex items-center justify-center px-4 py-2 border  hover:bg-gradient-to-r from-blue-600 to-purple-600 text-purple-900 dark:text-white dark:border-gray-400 hover:dark:border-purple-400 hover:text-white rounded-md mt-4 transition duration-300">
              <PlayCircle className="h-4 w-4 mr-2" /> Continue Learning
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContinueCourse;
