import { useCreateLectureMutation, useGetLectureQuery } from '@/features/api/lectureApi';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';
import Lecture from './Lecture';

const CreateLectures = () => {
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;

    const [lectureTitle , setLectureTitle] = useState("")
    const [createLecture, {data, isLoading, isSuccess, error}] =useCreateLectureMutation(courseId);
    const {data:lectureData, isLoading:LectureIsLoading, isSuccess:LectureIsSuccess, error:LectureError, refetch} = useGetLectureQuery(courseId, {refetchOnMountOrArgChange:true});


    const createLectureHandler = async()=>{
       await createLecture({lectureTitle, courseId})
    }
useEffect(()=>{
if(isSuccess){
  toast.success(data.message|| "Lecture Created Successfully");
  refetch()
}
if(error){
  toast.error(error.data.message || "Failed to create lecture")
} 


}, [data, isSuccess, error])
  

  return (

    <div className='w-[70%] px-10 my-2'>
      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>Hi,Danyal Arman </h1>
        <h1 className='text-xl font-semibold'>Add your lectures here below</h1>
      </div>      
      <div className='my-6 space-y-2'>
        <h2 className='font-semibold text-xl'>Title</h2>
        <input onChange={(e)=>setLectureTitle(e.target.value)} className='shadow-md outline-none py-2 px-4 w-[60vw] dark:placeholder:text-gray-300 text-black dark:border rounded-md border-white dark:bg-slate-950 dark:text-white' name='LectureTitle'  type="text" value={lectureTitle} placeholder="Lecture Name" />
      </div>
      <div className='sm:space-x-2 space-y-4 sm:space-y-0'>
        <button onClick={()=>navigate(`/admin/course/${courseId}`)} className='bg-white text-black border border-gray-200 px-3 py-2 rounded-md transition-transform transform will-change-transform  hover:scale-105 duration-500'>Back to course</button>
        <button onClick={createLectureHandler} className='bg-black text-white border border-gray-200 px-3 py-2 rounded-md transition-transform transform will-change-transform  hover:scale-105 duration-500'>Create Lecture</button>
      </div>
  {/* lecture videos */}
        <div className='my-10 space-y-2 '> 
           {LectureIsLoading?(<p>Loading Lecture...</p>):LectureError ? (<p>Failed to Load Lectures</p>) : lectureData
           .lectures.length === 0 ?(<p>No lectures added yet.</p>): lectureData?.lectures.map((lecture, index) =>(
           <Lecture key={lecture._id}  lecture={lecture} index={index} courseId={courseId}/>
           )) }
        </div>

    </div>
  )
}

export default CreateLectures
