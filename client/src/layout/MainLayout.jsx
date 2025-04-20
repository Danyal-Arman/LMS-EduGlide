// import React from 'react'; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";


import React from 'react'

const MainLayout = () => {
 
  return (
    <div>
    <Navbar/>
      <div>
        {/* children aayenge (to render children we use outlet) */}
        <Outlet/> {/* outlet is a special component in react router dom that allows us to render children */}
       {/* <Footer /> */}
      </div>
    </div>
  )
}

export default MainLayout
