import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const LECTURE_API ="https://eduglide-server.onrender.com/lecture"

const lectureApi = createApi({
    reducerPath: "lectureApi",
    tagTypes: ["RefetchLecture"],
    baseQuery: fetchBaseQuery({
        baseUrl: LECTURE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `/${courseId}`,
                method: "POST",
                body: { lectureTitle }
            }),
            invalidatesTags: ['RefetchLecture'],
        }),
        getLecture: builder.query({
            query: (courseId) => ({ 
                url: `/${courseId}`,
                method: "GET",
            }),
            providesTags: ['RefetchLecture']
        }),
        updateLecture: builder.mutation({
            query: ({lectureTitle,videoInfo, isPreviewFree,  lectureId, courseId }) => ({
                url: `/${courseId}/${lectureId}`,
                method: "POST",
                body: {lectureTitle,videoInfo, isPreviewFree}
            }), providesTags: ['RefetchLecture']
        }),
        getLectureById:builder.query({
            query: ({courseId, lectureId}) => ({
                url: `/${courseId}/${lectureId}`,
                method: "GET",
            }),
        }),
        removeLecture:builder.mutation({
            query: ({lectureId, courseId }) => ({
                url: `/${courseId}/${lectureId}/remove`,
                method: "DELETE",
            }),
            invalidatesTags: ['RefetchLecture'],
        }),
    })
}) 

export const { useCreateLectureMutation, useGetLectureQuery, useUpdateLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } = lectureApi
export default lectureApi