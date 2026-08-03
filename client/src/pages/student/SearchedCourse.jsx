/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const SearchedCourse = ({ course }) => {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-none">
      <Link to={`/course-detail/${course._id}`} className="flex flex-col gap-4 md:flex-row md:items-start">
        <img
          src={course.courseThumbnail}
          alt="course thumbnail"
          className="h-48 w-full rounded-2xl object-cover md:h-36 md:w-56"
        />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200">
              {course.category || "Course"}
            </Badge>
            <Badge className="rounded-full border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300">
              {course.courseLevel || "Beginner"}
            </Badge>
          </div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">{course.courseTitle}</h1>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{course.subTitle}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Instructor: <span className="font-semibold text-slate-900 dark:text-white">{course.creator?.username}</span>
          </p>
        </div>
        <div className="md:text-right">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">₹{course.coursePrice}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{course.enrolledStudents?.length || 0} learners</p>
        </div>
      </Link>
    </div>
  );
};

export default SearchedCourse;
