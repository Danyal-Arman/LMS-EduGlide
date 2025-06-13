import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const COURSE_API = "https://eduglide-server.onrender.com" || 'http://localhost:3000/course'

const courseApi = createApi({
    reducerPath:"courseApi",
    tagTypes:['RefetchCreatorCourse'],
    baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include"
    }),
    endpoints:(builder)=>({
        createCourse:builder.mutation({
            query:(courseData)=>({
                url:'',
                method:'POST',
                body:courseData
            }),
            invalidatesTags:['RefetchCreatorCourse'],
        }),
        searchCourse:builder.query({
            query:({query, categories, sortByPrice})=>{
                
                let queryValue = `/search?query=${encodeURIComponent(query)}` // isme line 29 and 33 & kerke add hojayega

                if(categories ){
                    // const categoryString = categories.map(encodeURIComponent).join(",");
                    queryValue +=   `&categories=${encodeURIComponent(categories)}`
                }

                if(sortByPrice){
                    queryValue += `&sortByPrice=${encodeURIComponent(sortByPrice)}`
                }
                return {
                    url:queryValue,
                    method: "GET"
                }
            },
            keepUnusedDataFor: 0,
        }),
        getPublishedCourse:builder.query({
            query:()=>({
                url:'/get-published-course',
                method:'GET'
            }),
        }),
        getCourses:builder.query({
            query:()=>({
                url:'',
                method:'GET'
            }),
            providesTags:['RefetchCreatorCourse'],//Used in queries to tag the data they fetch.
        }),
        getPublishedCourse:builder.query({
            query:()=>({
                url:'/get-published-course',
                method:'GET'
            }),
        }),
        editCourse:builder.mutation({
            query:({formData, courseId})=>({ // Accept courseId as a parameter
                url: `/${courseId}`,
                method:'PUT',
                body:formData,
            }),
            invalidatesTags:['RefetchCreatorCourse'],  // Used in mutations to tell RTK Query to invalidate those tags, triggering a refetch.
        }),
        getCourseById:builder.query({
            query:(courseId)=>({
                url:`/${courseId}`,
                method:'GET',
            })
            
        }),
        getUserCourseRatingById:builder.query({
            query:(courseId)=>({
                url:`/${courseId}/review/user`,
                method:'GET',
            })  
        }),
        getCourseAllReviewsAndRatings:builder.query({
            query:(courseId)=>({
                url:`/${courseId}/all-reviews`,
                method:'GET',
            })  
        }),
        courseReview:builder.mutation({
            query:({courseId, rating, review})=>({ // Accept courseId as a parameter
                url: `/${courseId}/review`,
                method:'POST',
                body: {rating, review}
            }),
        }),
        publishCourse:builder.mutation({
            query:({query, courseId})=>({ // Accept courseId as a parameter
                url: `/${courseId}/toggle-publish?publish=${query}`,
                method:'PUT',
            }),
            invalidatesTags:['RefetchCreatorCourse'],  // Used in mutations to tell RTK Query to invalidate those tags, triggering a refetch.
        }),
        removeCourse:builder.mutation({
            query:(courseId)=>({ // Accept courseId as a parameter
                url: `/${courseId}/delete-course`,
                method:'DELETE',
            }),
            invalidatesTags:['RefetchCreatorCourse'],  // Used in mutations to tell RTK Query to invalidate those tags, triggering a refetch.
        }),
    })
});

export const {useCreateCourseMutation, useSearchCourseQuery, useGetCoursesQuery,useEditCourseMutation, useGetCourseByIdQuery,useGetUserCourseRatingByIdQuery,useGetCourseAllReviewsAndRatingsQuery, useCourseReviewMutation, usePublishCourseMutation, useRemoveCourseMutation, useGetPublishedCourseQuery } = courseApi;
export default courseApi;



// published and unpublished course