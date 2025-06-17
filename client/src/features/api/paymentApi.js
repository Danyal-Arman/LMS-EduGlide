import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const PAYMENT_API = "http://localhost:8080/purchase"
// "https://eduglide-server.onrender.com/purchase"

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({
         baseUrl: PAYMENT_API,
         credentials:'include'
         }),
         endpoints: (builder) => ({
            createOrder: builder.mutation({
                query: (data) => ({
                    url: '/create-order',
                    method: 'POST',
                    body: data
                })
            }),
            verifyPayment: builder.mutation({
                query: (data) => ({
                    url: '/verify-payment',
                    method: 'POST',
                    body: data 
                })
            }),
            getAdminCoursePurchased:builder.query({
                   query: ()=>({
                    url: '/admin-course-purchased',
                    method: 'GET',
                   })
            }),
            
            getPurchasedCourseStatus: builder.query({
                query: (courseId) => ({
                    url: `/${courseId}`,
                    method: 'GET',
                })
            }),
            getAllPurchasedCourse: builder.query({
                query: () => ({
                    url: "",
                    method: 'GET',
                })
            }),
         })
    
})
export const {useCreateOrderMutation, useVerifyPaymentMutation, useGetPurchasedCourseStatusQuery, useGetAdminCoursePurchasedQuery, useGetAllPurchasedCourseQuery} = paymentApi;
export default paymentApi;