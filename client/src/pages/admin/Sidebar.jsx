import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { SidebarClose, SidebarOpen, } from 'lucide-react'
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
      <div className='relative flex min-h-screen'>
        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-slate-950 shadow-xl z-40 transform transition-transform duration-300 text-gray-200 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className='py-4 px-3'>
            <h1 className='text-2xl font-semibold mb-6 text-black dark:text-white text-center whitespace-normal break-words'>Admin Panel</h1>

            <Link to="/admin/dashboard">
              <h1 className='px-4 py-3 rounded-md text-black dark:text-white hover:text-purple-800 hover:bg-purple-100/80 hover:dark:bg-slate-800 transition-all duration-300 cursor-pointer whitespace-normal break-words'>
                Dashboard
              </h1>
            </Link>

            <Link to="/admin/course">
              <h1 className='px-4 py-3 rounded-md text-black dark:text-white hover:text-purple-800 hover:bg-purple-100/80 hover:dark:bg-slate-800 transition-all duration-300 cursor-pointer whitespace-normal break-words'>
                Course
              </h1>
            </Link>
          </div>
        </div>
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className={`fixed bottom-0 left-4 shadow-md  border z-50 bg-gray-100 dark:bg-gray-700 dark:text-gray-100  rounded-md text-black p-2  transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-[234px]' : '-translate-x-[15px]'
            }`}
        >
          {isSidebarOpen ? <SidebarClose /> : <SidebarOpen />}
        </button>

        {/* Main Content */}
        <main className="flex-1 transition-all duration-300 w-full">
          <Outlet />
        </main>
      </div>

    </>
  )
}

export default Sidebar




