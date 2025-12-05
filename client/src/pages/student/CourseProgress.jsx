import { useEffect } from "react";
import { PlayCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  useCourseCompleteMutation,
  useCourseInCompleteMutation,
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgress";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;

  const { data, isLoading, error, refetch } = useGetCourseProgressQuery({
    courseId,
  });
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    courseComplete,
    { data: courseCompleteData, isSuccess, error: courseCompleteError },
  ] = useCourseCompleteMutation();
  const [
    courseInComplete,
    { data: courseInCompleteData, isSuccess: courseInCompleteIssuccess },
  ] = useCourseInCompleteMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        courseCompleteData.message ||
          "congratulation! you completed this course successfully"
      );
      refetch();
    }
    if (courseCompleteError) {
      toast.error(
        courseCompleteError?.data?.message ||
          "Failed to complete course something went wrong"
      );
    }
  }, [
    courseCompleteData,
    isSuccess,
    courseCompleteError,
    courseInCompleteData,
    courseInCompleteIssuccess,
    refetch,
  ]);

  useEffect(() => {
    if (courseInCompleteIssuccess) {
      toast.success(
        courseInCompleteData.message ||
          "course marked as incompleted successfully"
      );
      refetch();
    }
  }, [courseInCompleteData, courseInCompleteIssuccess]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen font-montserrat">
        <div className="flex items-end gap-2">
          <div className="relative h-[37px] w-[15px]">
            <div className="absolute top-0 w-[15px] h-[15px] bg-[#fbae17] rounded-full animate-bounceball"></div>
          </div>
          <div className="text-[#fbae17] ml-2">NOW LOADING</div>
        </div>
      </div>
    );
  if (error) return <div>Error loading course progress.</div>;

  const { course, progress, completed } = data.data;
  const initialLecture =
    currentLecture || (course.lectures && course.lectures[0]);

  const handleLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgression = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    // handleLectureProgression(lecture._id)
  };
  const handleCourseCompleted = async () => {
    await courseComplete({ courseId });
  };
  const handleCourseInCompleted = async () => {
    await courseInComplete({ courseId });
  };

  const courseSubTitle = data?.data?.course?.subTitle;

  return (
    <div className="max-w-7xl mx-auto my-5 xl:flex gap-10 px-5 md:px-12 ">
      <div>
        <h1 className="text-xl font-Poppins font-semibold mb-2 pb-5">
          {courseSubTitle}
        </h1>
        <div>
          <video
            className="w-full h-fit xl:w-[50vw]   rounded-lg overflow-hidden "
            controls
            onPlay={() =>
              handleLectureProgression(
                currentLecture?._id || initialLecture?._id
              )
            }
            src={currentLecture?.videoUrl || initialLecture?.videoUrl}
          ></video>
        </div>
        <p></p>
        {/* <div className='flex justify-end'> */}
        <button
          onClick={completed ? handleCourseInCompleted : handleCourseCompleted}
          className={`p-2 flex gap-2 rounded-md my-2 ${
            completed
              ? "bg-slate-200 text-black font-semibold"
              : "bg-black text-white"
          } `}
        >
          <>{completed && <CheckCircle className="text-black" />}</>
          {completed ? "completed" : "Marked as Completed"}
        </button>
        {/* </div > */}
      </div>
      <div className=" space-y-3 mt-5 mb-10">
        <h2 className="text-xl font-semibold">Lectures</h2>
        {course.lectures.map((lecture) => (
          <div
            onClick={() => handleSelectLecture(lecture)}
            key={lecture._id}
            className={`flex items-start justify-between gap-3 p-4 rounded-lg dark:bg-gray-800/80  shadow-lg hover:shadow-xl transition-shadow group hover:cursor-pointer ${
              lecture._id === currentLecture?._id
                ? "bg-gray-200 dark:bg-gray-600/90"
                : ""
            }`}
          >
            <div className="flex items-center gap-4 ">
              {handleLectureCompleted(lecture._id) ? (
                <CheckCircle size={24} className="text-green-500 mt-1" />
              ) : (
                <PlayCircle
                  size={24}
                  className="text-green-500 mt-1 group-hover:scale-110 transition-transform"
                />
              )}
              <span>{lecture.lectureTitle}</span>
            </div>
            <div>
              {handleLectureCompleted(lecture._id) && (
                <span className="bg-green-200 text-green-800 rounded-md px-2 ">
                  Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgress;
