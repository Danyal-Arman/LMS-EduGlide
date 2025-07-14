import { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Sparkles, Sun, Moon, AlignJustify } from 'lucide-react';
import { useTheme } from '../context/themeContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'sonner';
import MobileNavBar from './MobileNavbar';
import { useGetUserQuery, useLogOutUserMutation } from '@/features/api/authApi';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Navbar = () => {
  const { theme, myThemeToggle } = useTheme();// a custom made hook
  const [navbarIsOpen, setNavbarIsOpen] = useState(false)
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const navigate = useNavigate();
  const {data} = useGetUserQuery( );
  const [logOutUser, {data:logOutData , isSuccess:logOutIsSuccess,  isError: logOutIsError,
  error: logOutErrorData}] = useLogOutUserMutation()
  

const logoutHandler= async()=>{
await logOutUser();
}

useEffect(() => {
  if (logOutIsSuccess && logOutData?.message) {
    toast.success(logOutData.message);
    navigate('/login');
  }

  if (logOutIsError && logOutErrorData?.data?.message) {
    toast.error(logOutErrorData.data.message);
  } else if (logOutIsError) {
    toast.error("Logout failed");
  }
}, [logOutIsSuccess, logOutIsError, logOutData, logOutErrorData, navigate]);


  return (
    <header className='flex pl-2 h-16 bg-white dark:bg-gray-900 dark:text-gray-100  shadow-md sticky top-0 z-10'>
      {/* Desktop*/}
      <nav className='flex justify-between  w-full items-center sm:pr-4'>

        <section>
          <div className='flex gap-4'>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className='flex justify-end'>
            <div onClick={()=>navigate("/")} className="flex flex-col ">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduGlide
              </span>
              <span className="text-xs text-gray-500 -mt-1 whitespace-normal break-words">
                Learning Management
              </span>
            </div>
           
            </div>
          </div>
        </section>

        <section className='flex gap-3 '>
   {/* Login & signup*/}
   {!data?.user ? (
    <div className={ `mt-1`}>
          <div className=' flex space-x-3'>
            <ul className='flex flex-wrap justify-end'>
              <li className='px-4 py-1 border-white rounded-md dark:hover:bg-gray-800'>
                <a href="/login">Login</a>
              </li>
              <li className='px-4 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'>
                <a href="/register">SignUp</a>
              </li>
            </ul>
            <div>

            </div>
          </div>
          </div>):

 ( <> <div onClick={() => setNavbarIsOpen((prev) => (!prev))} className='relative hidden sm:block'>
           {/* Desktop dropdown */}
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src={data?.user?.photo || "https://github.com/shadcn.png"} className="object-cover"/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {navbarIsOpen &&
              <div className="absolute -right-4 bg-white z-10 dark:bg-gray-900 border transform transition-all duration-300 origin-top w-56 rounded-md shadow-md hover:cursor-pointer mt-1">
                <h1 className='px-4 py-2 '>My Account</h1>
                <div className='h-[1px] w-full bg-gray-700'></div>
                {/* Menu Links */}
                <div >
                  <Link className="block  hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2 hover:px-6    transition-all duration-500 " to="/">Home</Link>
                  <Link  className="block hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2  hover:px-6   transition-all duration-500 " to="/profile">Profile</Link>
                  <Link className="block hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2  hover:px-6   transition-all duration-500  " to="/my-learning">My Learning</Link>         
                  {data?.user?.role === "student" && <Link className="block hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2  hover:px-6   transition-all duration-500  " to="/instructor">Be an Instructor</Link>}         
                  {data?.user?.role === "instructor" && <Link className="block hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2 hover:px-6   transition-all duration-500 " to="/admin/dashboard">Dashboard</Link>}
                  <button onClick={logoutHandler} className="flex justify-start dark:hover:bg-gray-800 hover:bg-gray-200 text-red-600 dark:text-red-400 w-full  px-4 py-2 hover:px-6   transition-all duration-500  " >Log out</button>
                </div>
                {/* Theme Toggle Button */}
                <button
                  onClick={myThemeToggle}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-lg  dark:text-yellow-400 font-semibold transition-colors bg-gray-200 dark:bg-gray-900"
                >
                  {theme === 'light' ? "" : <Sun />}
                  {theme === 'light' ? 'Darkness' : 'Light '}
                </button>
              </div>
            }
          </div>
       
        {/*Mobile Navbar */}
        <button 
        onClick={() => { setSidebarIsOpen(true) }}><AlignJustify className="w-fit h-13  pr-3 text-purple-600  sm:hidden  " />
        </button></>)}
        </section>

      </nav>
      <MobileNavBar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} myThemeToggle={myThemeToggle} theme={theme} logoutHandler={logoutHandler} data={data} />

    </header>
  )
}

export default Navbar;












