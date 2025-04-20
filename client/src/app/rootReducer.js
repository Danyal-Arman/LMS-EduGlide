//kyuke multiple reducer hone waale h to hmne ek uske liye file hi bna liye h
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import userApi from "../features/api/authApi";
import courseApi from "../features/api/courseApi";
import lectureApi from "@/features/api/lectureApi";
import paymentApi from "@/features/api/paymentApi";
import courseProgressApi from "@/features/api/courseProgress";



const rootReducer = combineReducers({ //combineReducer iss liye use kiya h ke multiple Apis aayengin  filhal to userApi h lekin courseApi wagaira bhi ho sktah                             
    [userApi.reducerPath]: userApi.reducer,// This stores the data fetched by the userApi. // abhi ye authApi/userApi ke liye h lekin baad me or bhi ho skta h jaise courseApi ke liye etc
    [courseApi.reducerPath]: courseApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer,
    auth:authReducer, // The key 'auth' is what makes state.auth exist
});
export default rootReducer;


 