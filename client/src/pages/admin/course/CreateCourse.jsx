import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [createCourse, { data, isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully");
      navigate("/admin/course");
    }
    if (error) {
      toast.success(data?.message || "Failed to create course");
    }
  }, [createCourse, data, isSuccess, error]);

  return (
    <div className="max-w-7xl mx-auto px-10 my-2 ">
      <div className="space-y-4flex flex-col items-center">
        <h1 className="text-2xl font-bold">Hi,</h1>
        <h1 className="text-xl font-semibold">
          Lets create your course add some details of like course title and
          category and take your course to the next level
        </h1>
      </div>
      {/* Title */}
      <div className="my-6 space-y-2">
        <h2 className="font-semibold text-xl">Title</h2>
        <input
          onChange={(e) => setCourseTitle(e.target.value)}
          className="shadow-md outline-none py-2 px-4 w-full lg:w-4/5 dark:placeholder:text-gray-200 text-black dark:text-white rounded-md dark:bg-gray-900 border"
          name="courseTitle"
          value={courseTitle}
          type="text"
          placeholder="Course Name"
        />
      </div>
      {/* Category */}
      <div className="space-y-2">
        <h2 className="font-semibold text-xl ">Category</h2>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="shadow-md py-2 px-2 font-semibold dark:text-gray-200 rounded-md w-full lg:w-4/5 dark:bg-gray-900 border"
          value={category}
        >
          <option value="option1">Select a category</option>
          <option value="Web Development">Web Development</option>
          <option value="Java Fullstack Development">
            Java Fullstack Development
          </option>
          <option value="MERN Stack Development">MERN Stack Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Javascript">Javascript</option>
          <option value="React">React</option>
          <option value="HTML & CSS">HTML & CSS</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="DevOps">DevOps</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="springboot">springboot</option>
          <option value="Next JS">Next Js</option>
          <option value="Artificial Intelligence">Docker</option>
        </select>
      </div>
      {/* Cancel and Create button */}
      <div className="flex flex-wrap my-4 gap-2">
        <button
          onClick={() => navigate("/admin/course")}
          className="bg-white dark:text-black rounded-md font-semibold px-3 py-1 shadow-md transition-transform transform hover:scale-105 duration-300 will-change-transform"
        >
          Back
        </button>
        <button
          disabled={isLoading}
          onClick={createCourseHandler}
          className="bg-black text-white rounded-md font-semibold px-5 py-1 shadow-md transition-transform transform hover:scale-105 duration-300 will-change-transform dark:border dark:border-white"
        >
          {isLoading ? (
            <span className="flex">
              <Loader2 className="animate-spin" />
              Please wait{" "}
            </span>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
