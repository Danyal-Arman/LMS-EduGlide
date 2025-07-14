import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Hero from './pages/student/Hero'
import Courses from './pages/student/Courses'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import { useGetUserQuery } from './features/api/authApi'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import CreateCourse from './pages/admin/course/CreateCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLectures from './pages/admin/lecture/CreateLectures'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminAcess, LoggedInUser, ProtectedRoute } from './components/ProtectedRoutes'
import SecurePurchasedCourse from './components/SecurePurchasedCourse'
import BecomeInstructor from './pages/admin/BecomeInstructor'
import Features from './pages/student/Features'
import Footer from './pages/student/Footer'


function App() {
  const {data:profileData, isLoading, refetch } = useGetUserQuery( );
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen font-montserrat">
      <div className="flex items-end gap-2">
        <div className="relative h-[37px] w-[15px]">
          <div className="absolute top-0 w-[15px] h-[15px] bg-[#fbae17] rounded-full animate-bounceball"></div>
        </div>
        <div className="text-[#fbae17] ml-2">NOW LOADING </div>
      </div>
    </div>
    
    );
  



  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout data={profileData}/>,
      children: [
        {
          path: '/',
          element: (
            <>
              <Hero />
              <Features/>
              <Courses />
              <Footer/>
              

            </>)
        },
        {
          path: 'my-learning',
          element: <ProtectedRoute><MyLearning data={profileData} isLoading={isLoading}/><Footer/></ProtectedRoute>
        },
        {
          path: 'profile',
          element: <ProtectedRoute><Profile data={profileData} isLoading={isLoading} refetch={refetch}/></ProtectedRoute>
        },
        {
          path: 'instructor',
          element: <ProtectedRoute><BecomeInstructor/></ProtectedRoute>
        },
        {
          path: 'search-page',
          element: <ProtectedRoute><SearchPage /></ProtectedRoute>
        },
        {
          path: 'course-detail/:courseId',
          element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
        },
        {
          path: 'course-progress/:courseId',
          element: 
          <ProtectedRoute>
            <SecurePurchasedCourse>
              <CourseProgress />
            </SecurePurchasedCourse>
          </ProtectedRoute>
        },

        //admin routes
        {
          path: 'admin',
          element: <AdminAcess><Sidebar/></AdminAcess>,
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />
            },
            {
              path: 'course',
              element: <CourseTable />
            },
            {
              path: 'course/create',
              element: <CreateCourse />
            },
            {
              path: "course/:courseId",
              element: <EditCourse />
            },
            {
              path: "course/lecture/:courseId",
              element: <CreateLectures />
            },
            {
              path: "course/lecture/:courseId/:lectureId",
              element: <EditLecture />
            },
          ],
        },

      ],

    },
    {
      path: 'login',
      element: <LoggedInUser><Login /></LoggedInUser>
    },
    {
      path: 'register',
      element: <LoggedInUser><Login /></LoggedInUser>
    },


  ])




  return (
    <>
      {/* <main> */}

      <RouterProvider router={appRouter} />
      {/* </main> */}
    </>
  )
}

export default App
