/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const SearchedCourse = ({ course }) => {
  return (
    <div className="rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-4 transition hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10">
      <Link to={`/course-detail/${course._id}`} className="flex flex-col gap-4 md:flex-row md:items-start">
        <img
          src={course.courseThumbnail}
          alt="course thumbnail"
          className="h-48 w-full rounded-2xl object-cover md:h-36 md:w-56"
        />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-200">
              {course.category || "Course"}
            </Badge>
            <Badge className="rounded-full border border-slate-700/80 bg-slate-900/70 text-slate-300">
              {course.courseLevel || "Beginner"}
            </Badge>
          </div>
          <h1 className="text-lg font-semibold text-white">{course.courseTitle}</h1>
          <p className="text-sm leading-6 text-slate-400">{course.subTitle}</p>
          <p className="text-sm text-slate-300">
            Instructor: <span className="font-semibold text-white">{course.creator?.username}</span>
          </p>
        </div>
        <div className="md:text-right">
          <h1 className="text-xl font-semibold text-white">₹{course.coursePrice}</h1>
          <p className="mt-1 text-sm text-slate-400">{course.enrolledStudents?.length || 0} learners</p>
        </div>
      </Link>
    </div>
  );
};

export default SearchedCourse;
