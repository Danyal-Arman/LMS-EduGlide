import { useGetCourseAllReviewsAndRatingsQuery } from "@/features/api/courseApi";
import { Rating } from "@mui/material";
import SeoAvatar from "@/components/SeoAvatar";

const CourseReview = ({ courseId }) => {
  const { data, isLoading } = useGetCourseAllReviewsAndRatingsQuery(courseId);

  if (isLoading) return <div>loading...</div>;

  const sortData = [...data?.Ratings.courseRating]
    .filter((rating) => rating.review.trim() !== "")
    .sort((a, b) => b.rating - a.rating);

  return (
    <div>
      {sortData.map((rating, index) => (
        <div
          key={index}
          className="flex bg-gray-200 dark:bg-gray-600  rounded-md p-2 my-5"
        >
          <SeoAvatar
            src={rating.user.photo || "https://github.com/shadcn.png"}
            name={rating.user?.username}
            fallbackText="CN"
          />
          <div className="flex relative flex-col w-full ">
            <div className="flex items-center  justify-between ">
              <h2 className="font-semibold">{rating.user.username}</h2>
              <Rating
                value={rating.rating}
                precision={0.5}
                size="small"
                readOnly
              />
            </div>
            <p>{rating.review} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseReview;
