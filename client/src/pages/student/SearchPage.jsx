import { useState } from "react";
import SearchedCourse from "./SearchedCourse";
import { useSearchCourseQuery } from "@/features/api/courseApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import CourseNotFound from "./CourseNotFound";
import { Skeleton } from "@/components/ui/skeleton";

const SearchPage = () => {
  const categories = [
    { id: "next js", label: "Next JS" },
    { id: "data science", label: "Data Science" },
    { id: "development", label: "Development" },
    { id: "javascript", label: "Javascript" },
    { id: "react", label: "React" },
    { id: "docker", label: "Docker" },
    { id: "devops", label: "Devops" },
    { id: "html", label: "HTML" },
    { id: "html & css", label: "HTML & CSS" },
    { id: "ui/ux design", label: "UI/UX" },
  ];

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [selectedCategories, setSelectedCategories] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useSearchCourseQuery({
    query: selectedCategories ? "" : query, // agr koi category select hua to query empty string hojayega "" : wrna agr category select nhi hoga to query return hoga
    categories: selectedCategories,
  });
  const isEmpty = !isLoading && data?.courses?.length === 0;

  const handleCategorySearch = (categoryId) => {
    setSelectedCategories((prev) => (prev === categoryId ? "" : categoryId));
    navigate("/search-page?query");
  };

  return (
    <div className="p-10 gap-10 bg-blue-50 dark:bg-gray-950">
      <div className="min-h-screen max-w-7xl mx-auto">
        <div className="flex justify-center flex-wrap gap-5 ">
          {categories.map((category) => (
            <button
              onClick={() => handleCategorySearch(category.id)}
              id={category.id}
              key={category.id}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 bg-white   ${
                selectedCategories === category.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/95 dark:bg-gray-100 backdrop-blur-sm text-gray-700 hover:bg-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="my-10">
          {isLoading ? (
            [1, 2, 3, 4].map((_, index) => <SearchCourseSkeleton key={index} />)
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => (
              <SearchedCourse course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const SearchCourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4 animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="w-full md:w-56 h-36 rounded overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Course Info Skeleton */}
      <div className="flex flex-col gap-3 w-full md:w-auto">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
        <div className="w-fit mt-2">
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
      </div>

      {/* Price Skeleton */}
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
};
