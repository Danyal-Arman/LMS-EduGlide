import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API = "https://eduglide-server.onrender.com/course-progress"

const courseProgressApi = createApi({
    reducerPath: "courseProgressApi",
    tagTypes:["CourseProgress"],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PROGRESS_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getCourseProgress: builder.query({
            query: ({courseId}) => ({
                url: `/${courseId}`, 
                method: "GET",
            }),
            // providesTags:["CourseProgress"]
        }),
        updateLectureProgress: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `/${courseId}/update-lecture-progress/${lectureId}`,
                method: "PUT",
            }),
        }),
        courseComplete: builder.mutation({
            query: ({ courseId}) => ({
                url: `/${courseId}/mark-course-completed`,
                method: "PUT",
            }),
            // invalidatesTags:["CourseProgress"]
        }),
        courseInComplete: builder.mutation({
            query: ({ courseId }) => ({
                url: `/${courseId}/mark-course-incompleted`,
                method: "PUT",
            }),
            // invalidatesTags:["CourseProgress"]
        }),
    }),
})
export const { useGetCourseProgressQuery, useUpdateLectureProgressMutation, useCourseCompleteMutation, useCourseInCompleteMutation } = courseProgressApi;
export default courseProgressApi;

