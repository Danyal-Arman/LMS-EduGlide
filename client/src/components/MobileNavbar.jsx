import { Home, User, Phone, PieChart, BookOpen, Moon, Sun, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetUserQuery, useLogOutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';




const MobileNavBar = ({ sidebarIsOpen, setSidebarIsOpen, myThemeToggle, theme, logoutHandler }) => {
  const { data } = useGetUserQuery();
  const [logOutUser, { data: logOutData, isSuccess: logOutIsSuccess, isError: logOutError }] = useLogOutUserMutation()
  const navigate = useNavigate()
  // const { user, isAuthenticated } = useSelector(state => state.auth);
  const authState = useSelector(state => state.auth);
  // console.log("Redux Auth State:", authState);




  useEffect(() => {
    if (logOutIsSuccess) {
      toast.success(logOutData.message || "Logout successfully")
      navigate('/login')
    }
    if (logOutError) {
      toast.error(logOutData.message || "Logout failed")
    }

  }, [logOutIsSuccess, logOutError, logOutUser])



  return (
    <>
      {/*cross Icon*/}
      <div className={`fixed h-full z-10 right-0 sm:hidden bg-white dark:bg-gray-900 shadow-xl dark:shadow-3xl duration-500 transition-transform ${sidebarIsOpen ? 'translate-x-0' : 'translate-x-full'
        } `}>
        <div className='flex justify-between px-3'>
          <div className='hover:cursor-pointer  '>
            <lord-icon
              src={"https://cdn.lordicon.com/nqtddedc.json"}
              trigger="hover"
              state="hover-cross-3"
              colors={theme === "dark" && "primary:#ffffff"}
              onClick={() => setSidebarIsOpen(false)}
              style={{ width: "30px", height: "50px" }}>

            </lord-icon>
          </div>

          <Avatar className="hover:cursor-pointer mt-2">
            <AvatarImage src={data?.user?.photo || "https://github.com/shadcn.png"} className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/*Sidebar Main Content */}
        <div className="flex flex-col pl-4 items-start w-60 space-y-6">
          <h2 className="text-2xl font-bold text-green-600">Manage</h2>
          <ul className="space-y-4 text-lg ">
            <li className="hover:text-gray-400 border-green-800 cursor-pointer flex gap-2">
              <Home />
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer flex gap-2">
              <User />
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer flex gap-2">
              <BookOpen />
              <Link to="/my-learning">My courses</Link>
            </li>
            {/* <li className="hover:text-gray-400 cursor-pointer flex gap-2">
              <Phone />
              <Link to="">Contact</Link>
            </li> */}

            {data?.user?.role === "instructor" && (
              <li className="hover:text-gray-400 cursor-pointer flex gap-2">
                <PieChart />
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>

          {/* Theme */}
          <button
            onClick={myThemeToggle}
            className=" flex items-center justify-center gap-2 text-lg hover:text-gray-500 dark:text-yellow-400 "
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon /> : <Sun />}
            {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
          </button>
          <button onClick={logoutHandler} className='flex gap-2 text-xl text-red-500'>
            <LogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileNavBar