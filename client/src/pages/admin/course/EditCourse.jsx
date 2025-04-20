import RichTextEditor from '@/components/RichTextEditor';
import { useRemoveCourseMutation, useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi';
import { ArrowRight, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const EditCourse = () => {
    const [courseInput, setCourseInput] = useState(
        {
            courseTitle: "",
            subTitle: "",
            description: "",
            category: "",
            courseLevel: "",
            coursePrice: "",
            courseThumbnail: "",
        });
    const params = useParams();
    const courseId = params.courseId;
    const { data: courseDataById, refetch} = useGetCourseByIdQuery(courseId, {refetchOnMountOrArgChange:true}) //jb jb value(arg) change hoga tb tb refetch hoga data
    const [previewThumbnail, setPreviewThubnail] = useState("")
    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
    const [publishCourse, {data:publishData}]= usePublishCourseMutation();
    const [removeCourse, {data:deleteCourseData,isSuccess:deleteCourseIsSucess, error:deleteCourseError}] = useRemoveCourseMutation();
    const navigate = useNavigate();

 
    const courseData = courseDataById?.course;
    useEffect(() => {
        if (courseData) {
            setCourseInput({
                courseTitle: courseData?.courseTitle || "",
                subTitle: courseData?.subTitle || "",
                description: courseData?.description || "",
                category: courseData?.category || "",
                courseLevel: courseData?.courseLevel || "",
                coursePrice: courseData?.coursePrice || "",
                courseThumbnail: courseData?.courseThumbnail || "",
            })
        }
    }, [courseData]);

    const handlePublishCourseStatus = async(action)=>{
        try {
            const response = await publishCourse({courseId, query:action.toString()});
            if (response?.data) {
                toast.success(response.data.message);
                refetch();
             }
              else {
                // if(response?.error){
                  toast.error(response.error.data.message || "Failed to publish course");
                // }
            }
            } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    const handleDeleteCourse = async() => {
        try {     
            const deleteResponse = await removeCourse(courseId);
            if(deleteResponse?.data){
             toast.success(deleteResponse.data.message)
             navigate("/admin/course")
            }
            else{
             toast.error(deleteResponse.error.data.message || "Failed to delete course")
            }
        } catch (error) {
            toast.error("Something went wrong! Failed to delete Course")
        }
        
    }
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseInput((prevState) => ({ ...prevState, [name]: value }));
    };
   
    const handleThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setCourseInput((prevState) => ({ ...prevState, courseThumbnail: file }));
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThubnail(fileReader.result);
            fileReader.readAsDataURL(file); // google it
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('courseTitle', courseInput.courseTitle);
        formData.append('subTitle', courseInput.subTitle);
        formData.append('description', courseInput.description);
        formData.append('category', courseInput.category);
        formData.append('courseLevel', courseInput.courseLevel);
        formData.append('coursePrice', courseInput.coursePrice);
        formData.append('courseThumbnail', courseInput.courseThumbnail);

        await editCourse({ formData, courseId })
    
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course updated successfully");
            navigate("/admin/course")
        }
        if (error) {
         toast.error(error.data.message || "Failed to update course");
        }


    }, [ isSuccess, error]);
    


    return (
        <div className='w-full  md:w-[85%] p-5  overflow-hidden'>
            <div className='flex items-center justify-between flex-wrap'>
                <h1 className='text-2xl font-bold font-Poppins whitespace-normal break-all'>Edit Course</h1>
                <button onClick={()=>navigate(`/admin/course/lecture/${courseId}`)} className='flex bg-black text-white px-4 py-1 rounded-md transition-transform hover:scale-95 duration-500 will-change-transform'> <Link to="lecture">Lectures</Link><span> <ArrowRight className='hover:pl-2' /></span></button>

            </div>
            <div className=' p-5 border shadow-lg my-5 ' >
                <div className='flex  flex-wrap items-center justify-between '>
                    <div className='flex flex-col'>
                        <p className='font-semibold whitespace-normal break-normal'>Make changes to the course information below as you like</p>
                    </div>

                    <div className='space-x-4 '>
                        <button   onClick={()=>handlePublishCourseStatus(courseDataById?.course.isPublished? "false":"true")} className='bg-white text-black border border-gray-200 px-3 py-1 rounded-md transition-transform transform will-change-transform  hover:scale-105 duration-500  dark:bg-slate-950 dark:text-white'>{courseDataById?.course.isPublished ? "UnPublish": "Publish"}</button>
                        <button  onClick={handleDeleteCourse} className='bg-black text-white px-3 py-1 rounded-md transition-transform transform will-change-transform  hover:scale-105 duration-500'>Remove Course</button>
                    </div>
                </div>
                {/*Title */}

                <div className='flex flex-col my-5 space-y-1'>
                    <label className='text-xl font-semibold'>Title</label>
                    <input onChange={handleChange} type="text" placeholder="Course Title" value={courseInput.courseTitle} name='courseTitle' className="w-full lg:w-[90%] p-2 border border-gray-200 rounded-md text-black dark:bg-slate-950 dark:text-white" />
                </div>
                {/* Subtitle */}
                <div className=' flex flex-col my-5 space-y-1'>
                    <label className='text-xl font-semibold'>Subtitle</label>
                    <input onChange={handleChange} type="text" placeholder="Subtitle" value={courseInput.subTitle} name='subTitle' className="w-full lg:w-[90%] p-2 border border-gray-200 rounded-md text-black  dark:bg-slate-950 dark:text-white" /> 
                </div>

                <div className='flex flex-col my-5 space-y-1'>
                    <label className='text-xl font-semibold'>Description</label>
                    <RichTextEditor courseInput={courseInput} setCourseInput={setCourseInput} />
                </div>


                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

                    {/* Course Category */}
                    <div className='space-y-1 flex flex-col ' >
                        <label className='text-xl font-semibold'>Category</label>
                        <select onChange={handleChange} value={courseInput.category} name='category' className='py-2 border  rounded-md text-black border-white dark:bg-slate-950 dark:text-white' id="">
                            <option value="option1" >Select course category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Java Fullstack Development">Java Fullstack Development</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Javascript">Javascript</option>
                            <option value="Python">Python</option>
                            <option value="Python">Python</option>
                            <option value="React">React</option>
                            <option value="HTML & CSS">HTML & CSS</option>
                            <option value="CSS">CSS</option>
                            <option value="MERN Stack Development">MERN Stack Development</option>
                            <option value="DevOps">DevOps</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Docker">Docker</option>
                            <option value="Java">Java</option>
                            <option value="Next Js">Next Js</option>
                            <option value="springboot">springboot</option>
                        </select>
                    </div>
                    {/* course Level */}
                    <div className='space-y-1 flex flex-col'>
                        <label className='text-xl font-semibold'>Course Level</label>
                        <select onChange={handleChange} value={courseInput.courseLevel} name='courseLevel' className='py-2 border rounded-md text-black flex justify-between pr-5 border-white dark:bg-slate-950 dark:text-white' id="">
                            <option value="option1" >Select course level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advance">Advance</option>
                        </select>
                    </div>
                    {/* Price */}
                    <div className=' space-y-1 flex flex-col'>
                        <label className='text-xl font-semibold'>Price(In INR)</label>
                        <input onChange={handleChange} value={courseInput.coursePrice} name='coursePrice' className='py-2 border px-1 rounded-md text-black border-white dark:bg-slate-950 dark:text-white' type="text" placeholder='Price' />
                    </div>
                </div>


                {/* Course thumbnail */}
                <div className='my-5 space-y-1'>
                    <h2 className='text-xl font-semibold'>Course Thumbnail</h2>
                    <input onChange={handleThumbnail} type="file" accept="image/*" className='py-1 border px-1 w-full sm:w-auto rounded-md ' />
                    {
                        previewThumbnail && (<img src={previewThumbnail} alt="Course Thumbnail" className='w-60 my-4' />)
                    }

                </div>

                {/* save and cancel button */}
                <div className='flex flex-wrap justify-center sm:justify-start gap-2 my-10 '>
                    <button onClick={() => navigate("/admin/course")} className='bg-white text-black border border-gray-200 px-3 py-1 rounded-md transition-transform transform will-change-transform  hover:scale-105 duration-500'>Back</button>
                    <button onClick={handleSave} className='bg-black text-white border border-gray-200 px-3 py-1 rounded-md transition-transform transform will-change-transform  hover:scale-105 duration-500'>
                        {isLoading ?
                            (<>
                                <span className='flex'><Loader2 className='animate-spin h-7 w-4 mr-2 ' />Please Wait</span>
                            </>)
                            :
                            ("save")}
                    </button>
                </div>
            </div>
        </div>



    )
}

export default EditCourse


