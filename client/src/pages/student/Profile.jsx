import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import {
    User,
    Mail,
    Camera,
    GraduationCap,

} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useUpdateUserProfileMutation } from '@/features/api/authApi';
import ContinueCourse from './ContinueCourse';

function Profile({data, isLoading, refetch}) {
    // const { data, isLoading, refetch } = useGetUserQuery({ refetchOnMountOrArgChange: true });  // for query{} is used , for mutation []is used
    const [updateUserProfile, { data: profileData, isSuccess: profileIsSucess, error: profileError }] = useUpdateUserProfileMutation();

    const [profile, setProfile] = useState(null)
    const [isEditing, setIsEditing] = useState(false);
    const [prevProfile, setPrevProfile] = useState(null)
    const [profilePhoto, setProfilePhoto] = useState('')
    const fileReference = useRef(null)



    useEffect(() => {
        if (data?.user) {
            const userProfile = {
                username: data.user.username,
                email: data.user.email,
                role: data.user.role,
                photo: data.user.photo,
                id: data.user._id
            };
            setProfile(userProfile);
            setPrevProfile(userProfile);
        }
    }, [data?.user])

    useEffect(() => {
        if (profileError) {
            toast.error(profileError.data.message || "Profile update failed")
        }
        if (profileIsSucess) {
            toast.success(profileData.message || `Profile updated successfuy`)
            refetch();
        }


    }, [profileIsSucess, profileError])
;



    if (isLoading || !profile)
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

    // dono me se koi bhi agar true hoga to loading aayega




    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
        setProfile({ ...profile, [name]: value })
    };
    const handleProfilePhoto = (e) => {
        const file = e.target.files?.[0]
        if (file) setProfilePhoto(file);

    }
    // for form Data (when we send file we have to use formData)
    const updateUser = async () => {
        const formData = new FormData();
        formData.append("username", profile.username)
        formData.append("id", profile.id);
        formData.append("profilePhoto", profilePhoto)
        formData.append("role", profile.role)
        await updateUserProfile(formData)
    }

    const handlSave = async () => {
        updateUser();
      const refetched =  await refetch()
        setIsEditing(false);

    }
    const handleCancel = () => {
        setIsEditing(false)
        setProfile(prevProfile);
 
    }
    const user =  data?.user;

    return (
        <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 gap-10 ">
            <div className="my-6 flex flex-wrap justify-between lg:sticky lg:top-24    ">
                <h1 className='text-4xl font-semibold '>Profile</h1>
                <div className='space-x-2'>
                    {!isEditing && <button onClick={() => setIsEditing(true)} className={`text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-700  text-white px-5 py-1 rounded-md transition-all duration-300`}>Edit</button>}
                    {isEditing && <>
                        <button onClick={handlSave} className='text-xl font-semibold bg-green-600 hover:bg-green-700 text-white px-5 py-1 rounded-md transition-all duration-300'>Save</button>
                        <button onClick={handleCancel} className='text-xl font-semibold bg-red-600 hover:bg-red-700 text-white px-5 py-1 rounded-md transition-all duration-300'>Cancel</button>
                    </>}
                </div>
            </div>

            <div className='  grid grid-cols-1 lg:grid-cols-3 '>
                {/*Left side */}
                <div className='lg:col-span-1 h-fit px-5 lg:sticky lg:top-40  rounded-md py-10 shadow-md  dark:bg-gray-900  '>
                    <div className=''>
                        <div className='flex flex-col items-center space-y-2 '>
                            <div className='relative'>
                                <Avatar className="hover:cursor-pointer ">
                                    <AvatarImage key={user?.photo} src={user?.photo || "https://github.com/shadcn.png"} className='h-24 rounded-full object-cover w-24' alt="Avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <input accept='image/*' ref={fileReference} type="file" className='hidden' onChange={handleProfilePhoto} />
                                {isEditing && <> <button onClick={() => fileReference.current.click()} className='absolute right-0 top-16 bg-blue-700 rounded-full  p-2'><Camera className='h-4 w-4 text-white' /></button> </>}
                            </div>
                        </div>

                        <div className=" space-y-4 mt-10 relative">
                            <div className='flex items-center '>
                                <User className="h-5 w-5  mr-3" />
                                <input onChange={handleChange} className='dark:text-white  focus:outline-none dark:bg-gray-900 w-full md:w-64 ' type='text' name='username' value={profile.username} readOnly={!isEditing} autoComplete='off' />
                            </div>
                            <div className="flex items-center text-White">
                                <Mail className="h-5 w-5 mr-3 " />
                                <input onChange={handleChange} className='dark:text-white focus:outline-none dark:bg-gray-900 w-full md:w-96' type="text" name='email' value={profile?.email || ''} readOnly={!isEditing} autoComplete='off' />
                            </div>
                            <div className="flex items-center text-White">
                                <GraduationCap className="h-6 w-6 mr-3" />
                                <select onChange={handleChange} disabled={!isEditing} value={profile.role} className='dark:text-white  dark:bg-gray-900 sm:w-fit sm:pr-3   w-full  appearance-none' name="role" id="">
                                    <option value="student">STUDENT</option>
                                    <option value="instructor">INSTRUCTOR</option>
                                </select>
                            </div>

                        </div>
                    </div>


                </div>
                {/* Right side */}

                {/*Courses */}
                  <div className="lg:col-span-2 my-4 lg:my-0 space-y-4">
                    <h1 className="text-3xl font-semibold text-center">Enrolled Courses</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2 sm:px-4">
                        {user?.enrolledCourses.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500">You are not enrolled in any courses yet.</p>
                        ) : (
                            user.enrolledCourses.map((course) => (
                                <div key={course._id} className="w-full md:max-w-sm">
                                    <ContinueCourse course={course} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;



