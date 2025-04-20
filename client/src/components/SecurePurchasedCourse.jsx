import { useGetPurchasedCourseStatusQuery } from "@/features/api/paymentApi"
import { Navigate, useParams} from "react-router-dom"

const SecurePurchasedCourse = ({children}) => {
    const {courseId}= useParams()
    const {data , isLoading} = useGetPurchasedCourseStatusQuery(courseId)

    if(isLoading) return <div>loading...</div>

    return data?.purchasedCourse ? children : <Navigate to= {`/course-detail/${courseId}`}/>

}

export default SecurePurchasedCourse
