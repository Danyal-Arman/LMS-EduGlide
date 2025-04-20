import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer";
import userApi from "@/features/api/authApi"
import courseApi from "@/features/api/courseApi"
import lectureApi from "@/features/api/lectureApi";
import paymentApi from "@/features/api/paymentApi";
import courseProgressApi from "@/features/api/courseProgress";




export const appStore = configureStore({
    reducer: rootReducer,  //  this is layer inside store // which hold multiple slices
    middleware: (getDefaultMiddleware) => //agr middleware nhi hoga to Rtk query kaam hi nhi krega /(getDefaultMiddleware) ye ek callback function h naam kuch bi hosakta h //  middleware from RTK Query (userApi, courseApi, etc.), which helps in handling API requests.
        getDefaultMiddleware().concat(userApi.middleware, courseApi.middleware, lectureApi.middleware, paymentApi.middleware, courseProgressApi.middleware),
});
const initializeApp = async()=>{
    await appStore.dispatch(userApi.endpoints.getUser.initiate({}, { forceRefetch: true }));

}
initializeApp();     

