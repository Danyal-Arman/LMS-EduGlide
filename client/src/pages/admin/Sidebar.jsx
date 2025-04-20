import React from 'react'
import {Link, Outlet } from 'react-router-dom'

const sidebar = () => {
  return (
    <>
    {/* <div className='flex'>
    <div className='w-[260px] bg-neutral-200 min-h-screen'>
    <div>
         <Link to="/admin/dashboard">
          <h1 className='px-2 py-2 hover:bg-gray-600  text-xl transition-all   hover:px-3  duration-300'>Dashboard</h1>
         </Link>
         <Link to="/admin/course">
          <h1 className='px-2 py-2 hover:bg-gray-600  text-xl transition-all hover:px-3 duration-300'>Course</h1>
         </Link>    
     </div>
 </div>
     <Outlet/>
     </div> */}
   <div className='flex'>
  {/* Sidebar */}
  <div className='sm:w-[250px] flex-shrink bg-gray-700 min-h-screen text-gray-200 '>
    <div className='py-4 px-3'>
      <h1 className='text-2xl font-semibold mb-6 text-center whitespace-normal break-all'>Admin Panel</h1>

      <Link to="/admin/dashboard">
        <h1 className='px-4 py-3 rounded-md hover:bg-gray-600 transition-all duration-300 cursor-pointer whitespace-normal break-normal'>
          Dashboard
        </h1>
      </Link>

      <Link to="/admin/course">
        <h1 className='px-4 py-3 rounded-md hover:bg-gray-600 transition-all duration-300 cursor-pointer whitespace-normal break-all'>
          Course
        </h1>
      </Link>
    </div>
  </div>
  
  {/* Main Content */}
  <Outlet />
</div>


</>
  )
}

export default sidebar
