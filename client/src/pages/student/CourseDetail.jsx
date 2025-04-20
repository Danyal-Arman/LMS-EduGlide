import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PurchaseCourse from '@/components/PurchaseCourse';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Users,
    PlayCircle,
    Star,
    Calendar,
    Download,
    ChevronRight,
    Sparkles,
    LockIcon,

} from 'lucide-react';
import { useGetCourseAllReviewsAndRatingsQuery, useGetCourseByIdQuery, useGetUserCourseRatingByIdQuery } from '@/features/api/courseApi';
import { useParams } from 'react-router-dom';
import { useCreateOrderMutation, useGetPurchasedCourseStatusQuery, useVerifyPaymentMutation } from '@/features/api/paymentApi';
import CourseReview from './CourseReview';
import RatingCard from './RatingCard';
import { Rating } from "@mui/material";

const CourseDetail = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isVisible, setIsVisible] = useState(false);
    const [showCard, setShowCard] = useState(false)
    const free = false
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();



    const { data } = useGetCourseByIdQuery(courseId);
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [verifyPayment] = useVerifyPaymentMutation()
    const userId = useSelector((state) => state.auth.user?._id);
    const { data: purchasedCourseData, isLoading: purcahsedIsLoading } = useGetPurchasedCourseStatusQuery(courseId);
    const {data:courseRatingData} = useGetCourseAllReviewsAndRatingsQuery(courseId)


    const loadScript = (src) => {

        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true); // If already loaded, resolve immediately
            }
            else {
                const script = document.createElement('script')
                script.src = src
                script.onload = () => resolve(true)
                script.onerror = () => resolve(false)
                document.body.appendChild(script);
            }
        })
    }
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js")
    }, [])

    const handleOrderAndPayment = async () => {
        try {
            const orderResponse = await createOrder({ courseId, userId }).unwrap();


            handlePayment(orderResponse);
        } catch (error) {
            alert("Failed to create order. Please try again.");
        }
    };



    const handlePayment = (orderData) => {
        if (!orderData) {
            alert("Order could not be created. Please try again.");
            return;
        }
        const options = {

            key: orderData?.key,
            amount: orderData?.amount,
            currency: orderData?.currency,
            name: "LearnSphere",
            description: "Course Payment",
            order_id: orderData?.order_id,

            handler: async (response) => {
                try {

                    await verifyPayment({

                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        courseId,
                        userId,
                    })
                    alert("Payment Successful!");
                } catch (error) {
                    alert("Payment verification failed! Please contact support.");
                }


            }
        }
        const razorpay = new window.Razorpay(options);
        razorpay.open()
    }



    useEffect(() => {
        setIsVisible(true);
    }, []);

    if (purcahsedIsLoading) 
        return (
            <div className="flex justify-center items-center min-h-screen font-montserrat">
              <div className="flex items-end gap-2">
                <div className="relative h-[37px] w-[15px]">
                  <div className="absolute top-0 w-[15px] h-[15px] bg-[#fbae17] rounded-full animate-bounceball"></div>
                </div>
                <div className="text-[#fbae17] ml-2">NOW LOADING</div>
              </div>
            </div>
          );
    const { course, purchasedCourse } = purchasedCourseData;




const sumOfAllRating = courseRatingData?.Ratings?.courseRating.reduce((acc, currentVal)=>{
   return acc + (currentVal.rating)
},0)


const totalRating = courseRatingData?.Ratings?.courseRating.length

const averageRating = isNaN(sumOfAllRating / totalRating)  
? 0
: (sumOfAllRating/totalRating).toFixed(1)  



    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hero Section */}
            <div className={`bg-gradient-to-r from-indigo-900 to-purple-900 dark:from-gray-900 dark:to-gray-800 text-white transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="lg:w-2/3">
                            <div className="flex items-center gap-2 text-indigo-300 dark:text-indigo-400 mb-4 hover:text-indigo-200 dark:hover:text-indigo-300 transition-colors">
                                <BookOpen size={20} className="animate-pulse" />
                                <span>{course.category}</span>
                            </div>

                            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 dark:from-gray-100 dark:to-indigo-400">
                                {course.courseTitle}
                            </h1>

                            <p className="text-lg text-indigo-200 dark:text-gray-300 mb-6 leading-relaxed">
                                {course.subTitle}
                            </p>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-2 hover:text-indigo-300 dark:hover:text-indigo-400 transition-colors">
                                    <Users size={20} className="animate-bounce" />
                                    <span>{course.enrolledStudents.length} students enrolled</span>
                                </div>
                                <div className="flex items-center gap-1 group">
                                    <Rating
                                        value={averageRating}
                                        precision={0.5}
                                        size="medium"
                                        readOnly
                                    />
                                    <span className="ml-2 group-hover:text-yellow-300 transition-colors">( {averageRating || 0} )</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {purchasedCourse && <button onClick={() => navigate(`/course-progress/${courseId}`)} className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 hover:from-indigo-600 hover:to-purple-600 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                                    <PlayCircle size={20} className="animate-pulse" />
                                    Start Learning
                                </button>}
                                {purchasedCourse &&
                                    <div className='relative'>
                                        <button onClick={() => setShowCard(!showCard)} className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 hover:from-indigo-600 hover:to-purple-600 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl  ">
                                            <Star
                                                size={20}
                                                fill="#FCD34D"
                                                color="#FCD34D" />
                                            Rate our Course
                                        </button>
                                        <div className={`absolute z-10 mt-2 transition-transform transform duration-500  ${showCard ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                            }`}>
                                            {showCard && <RatingCard courseId={courseId} setShowCard={setShowCard}/>}
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>

                        {/* video */}
                        <div className="transform transition-all duration-1000 hover:cursor-pointer">
                            <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white backdrop-blur- rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700 w-auto sm:w-[550px]">
                                <div className="relative aspect-video cursor-pointer group">
                                    <video className='absolute  sm:h-full w-full ' controls={true} src={course.lectures[0]?.videoUrl}></video>
                                </div>

                                <div className="px-8 py-3 sm:p-8 ">
                                    <div>
                                        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent dark:from-gray-100 dark:to-indigo-400 line-clamp-1">
                                            {course.lectures[0]?.lectureTitle}
                                        </h2>
                                    </div>
                                    <div className="text-4xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent dark:from-gray-100 dark:to-green-400">
                                        ₹{data?.course.coursePrice}
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <Calendar size={24} className="text-indigo-500 dark:text-indigo-400" />
                                            <span>Lifetime Access</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Download size={24} className="text-indigo-500 dark:text-indigo-400" />
                                            <span>Downloadable Resources</span>
                                        </div>
                                        <div className='w-full'>
                                            {purchasedCourse ? (
                                                <button onClick={() => navigate(`/course-progress/${courseId}`)} className='flex bg-gradient-to-r w-full justify-center gap-4 text-white rounded-md px-2 py-2 hover:scale-105 transition-transform duration-500 will-change-transform'>
                                                    Continue Course
                                                </button>
                                            ) : (
                                                <button className='w-full'>
                                                    <PurchaseCourse handlePayment={handleOrderAndPayment} isLoading={isLoading} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Content Tabs */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700 mb-8">
                    {['overview', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            className={`pb-4 px-4 font-medium capitalize relative group ${activeTab === tab
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform transition-transform duration-300 ${activeTab === tab ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div className="transform transition-transform">
                                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                    <Sparkles className="text-yellow-500" />
                                    What you'll learn
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {course.lectures.map((lecture, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow group"
                                        >
                                            {free ? (
                                                <PlayCircle
                                                    size={24}
                                                    className="text-green-500 mt-1 group-hover:scale-110 transition-transform"
                                                />
                                            ) : (
                                                <LockIcon size={24} className="text-black dark:text-gray-400 mt-1" />
                                            )}
                                            <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {lecture.lectureTitle}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow transform hover:scale-105">
                                <h3 className="text-2xl font-semibold mb-6 dark:text-gray-100">Course Description</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {course.description}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all transform hover:scale-105">
                                <h3 className="text-2xl font-semibold mb-6 dark:text-gray-100">Course Features</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Lectures', value: `${course.lectures.length}` },
                                        { label: 'Skill Level', value: `${course.courseLevel}` },
                                        { label: 'Last update', value: `${course.updatedAt.split("T")[0]}` },
                                    ].map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between group hover:bg-indigo-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
                                        >
                                            <span className="text-gray-600 dark:text-gray-300">{feature.label}</span>
                                            <span className="font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                                                {feature.value}
                                                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (<CourseReview courseId={courseId}/>)}
            </div>
        </div>
    );
}

export default CourseDetail;






