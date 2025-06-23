import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn, userLoggedOut } from '../authSlice';

const USER_API = "https://eduglide-server.onrender.com/user/"

const userApi = createApi({
    reducerPath: "userApi",
    tagTypes:["User"],
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({ //(builder) callback function // for data fetching and data posting(data bhejna)
        registerUser: builder.mutation({ // for data fetching(data get kr rahe ) from api, query is used and for data posting in or to api, mutation is used
            query: (inputData) => ({ //yaha pe query:(inputData) recieve data ,jo data aayega(is case me register ka input data)
                url: 'register',
                method: 'POST',
                body: inputData,// body me input data pass krna h

            }),
        }),
        loginUser: builder.mutation({

            query: (inputData) => ({ //yaha pe query:(inputData) recieve data ,jo data aayega(is case me login ka input data)
                url: 'login',
                method: 'POST',
                body: inputData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user: result.data.user} ))// {user:result.data.user} yaha user ka data aayega name: , email, password, id and more
                    dispatch(userApi.util.invalidateTags(['User']));

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        LogOutUser:builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
                }),
                async onQueryStarted(_, { queryFulfilled, dispatch }) {
                    try {
                        await queryFulfilled;
                        dispatch(userLoggedOut())
                    } catch (error) {
                        console.log(error)
                    }
                } ,
        }),
        getUser: builder.query({
            query: () => ({
                url: 'profile',
                method: 'GET',
            }),
            providesTags: ['User'],
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                     dispatch(userLoggedIn( {user:result.data.user} ))// {user:result.data.user} yaha user ka data aayega name: , email, password, id and more

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateUserProfile: builder.mutation({ // mutation isliye ke kuch naya data(post krne wale h) bhejne wale h <div className=""></div>
            query: (formData) => ({
                url: 'profile/update',
                method: 'PUT',
                body:formData,
                credentials:"include"

            }),
            invalidatesTags:['User']
        })
    })
})
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetUserQuery,
    useUpdateUserProfileMutation, 
    useLogOutUserMutation,
} = userApi 

export default userApi;
//ye jo rtk query mene bnaya h na to abb isko store.js me dalna padega  