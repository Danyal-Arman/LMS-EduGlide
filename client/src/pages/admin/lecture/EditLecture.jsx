import { useGetLectureByIdQuery, useGetLectureQuery, useRemoveLectureMutation, useUpdateLectureMutation } from '@/features/api/lectureApi';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import axios from 'axios';


const MEDIA_API = "http://localhost:3000/media"

const EditLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ setBtnDisable] = useState(true);
    const params = useParams();
    const courseId = params.courseId
    const lectureId = params.lectureId

    const [updateLecture, { data, isLoading, isSuccess, error }] = useUpdateLectureMutation(courseId, lectureId);
    const [removeLecture, { data: removeData, isSuccess: removeIsSuccess, error: removeError, isLoading: removeIsLoading }] = useRemoveLectureMutation();
    const { data: lectureDataById } = useGetLectureByIdQuery({ courseId, lectureId }, { refetchOnMountOrArgChange: true });


    const navigate = useNavigate();
    const fileUpdateHandler = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: ({ loaded, total }) => {
                        const progress = Math.round((loaded * 100) / total - 1)
                        setUploadProgress(progress)
                    }
                });
                if (res.data.success) {
                    setUploadVideoInfo({ videoURL: res.data.data.url, publicId: res.data.data.public_id })
                    setBtnDisable(false)
                    toast.success(res.data.message);

                }
            } catch (error) {
                toast.error("Failed to upload Video")
            }
            finally {
                setTimeout(() => {
                    setMediaProgress(false); // ✅ Hide progress bar **AFTER** 100% is reached
                }, 1000);
            }
        }
    }
    const handleLectureUpdate = async () => {
        await updateLecture({
            lectureTitle,
            videoInfo: uploadVideoInfo,
            isPreviewFree: isFree,
            courseId,
            lectureId
        })
    }
    const handleRemoveLecture = async () => {
        await removeLecture({ courseId, lectureId })
    }

    useEffect(() => {
        if (lectureDataById) {
            setLectureTitle(lectureDataById.lecture.lectureTitle)
            setIsFree(lectureDataById.lecture.isPreviewFree)
            setUploadVideoInfo(lectureDataById.lecture.videoUrl)
        }

    }, [lectureDataById])


    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Lecture updated successfully")
            navigate(`/admin/course/lecture/${courseId}`)
        }
        if (error) {
            toast.error(error.data?.message || "Failed to update lecture")
        }
    }, [isSuccess, error])

    useEffect(() => {
        if (removeIsSuccess) {
            toast.success(removeData.message || "Lecture delete successfully")
            navigate(`/admin/course/lecture/${courseId}`)
        }
        if (removeError) {
            toast.error(error.removeData?.message || "Failed to delete lecture")
        }
    }, [removeIsSuccess, removeError]);


    return (
        <div className='w-full  md:w-[85%] p-10  overflow-hidden space-y-2'>
            <div className='flex items-center gap-1 '>
                <ArrowLeft onClick={() => navigate(`/admin/course/lecture/${courseId}`)} className='hover:pr-2 hover:cursor-pointer w-8 transition-all transform duration-200' />
                <h1 className='text-xl font-bold'>Update Your Lecture</h1>
            </div>
            <div className='border shadow-md rounded-md p-4 '>
                <div className='space-y-1'>
                    <label className='font-bold ' htmlFor="EditLecture">Edit Lecture</label>
                    <p className='font-semibold'>Make changes to your Lecture</p>
                    <button onClick={handleRemoveLecture} disabled={removeIsLoading} className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg'>{removeIsLoading ? (<span className='flex gap-2'><Loader2 className='h-7 w-4 mr-2 animate-spin text-white' />Please Wait</span>) : ("Remove Lecture")}</button>
                </div>
                {/* Title */}
                <div className='my-8 flex flex-col gap-1'>
                    <label className='font-bold ' htmlFor="Title">Title</label>
                    <input onChange={(e) => setLectureTitle(e.target.value)} className="bg-gray-100 border py-2 px-2 rounded-md w-full border-white dark:bg-slate-950 dark:text-white sm:w-[90%]" type="text" value={lectureTitle} autoComplete="off" placeholder='Ex- Introduction to React'></input>
                </div>
                {/* Video */}
                <div className='flex flex-col my-4 gap-1'>
                    <label className='font-bold ' htmlFor="Title">Video </label>
                    <input onChange={fileUpdateHandler} className="bg-gray-100 border py-1 px-1 rounded-md w-fit custom-file-input border-white dark:bg-slate-950 dark:text-white" type="file" accept="video/*" ></input>
                </div>
                <div className='my-8 space-y-3'>
                    <h2 className='font-bold flex items-center gap-4'><Switch checked={isFree} onCheckedChange={setIsFree} />Is this video free?</h2>
                </div>
                {mediaProgress && (
                    <div className='my-4'>
                        <Progress value={uploadProgress} className="w-[270px]" />
                        <p>{uploadProgress}% Uploaded</p>
                    </div>)}
                <div >
                    <button onClick={handleLectureUpdate} disabled={isLoading} className='bg-black dark:border dark:border-white dark:bg-green-500 text-white rounded-md px-2 py-1 hover:bg-gray-700'>{isLoading ? (<span className='flex gap-2'><Loader2 className='h-7 w-4 mr-2 animate-spin' />Please Wait</span>) : ("Update Lecture")}</button>
                </div>
            </div>
        </div>
    )
}

export default EditLecture
