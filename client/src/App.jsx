import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import { useGetUserQuery } from "./features/api/authApi";
import {
  AdminAcess,
  LoggedInUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";

const Hero = lazy(() => import("./pages/student/Hero"));
const Courses = lazy(() => import("./pages/student/Courses"));
const Login = lazy(() => import("./pages/Login"));
const MyLearning = lazy(() => import("./pages/student/MyLearning"));
const Profile = lazy(() => import("./pages/student/Profile"));
const Sidebar = lazy(() => import("./pages/admin/Sidebar"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const CourseTable = lazy(() => import("./pages/admin/course/CourseTable"));
const CreateCourse = lazy(() => import("./pages/admin/course/CreateCourse"));
const EditCourse = lazy(() => import("./pages/admin/course/EditCourse"));
const CreateLectures = lazy(() => import("./pages/admin/lecture/CreateLectures"));
const EditLecture = lazy(() => import("./pages/admin/lecture/EditLecture"));
const CourseDetail = lazy(() => import("./pages/student/CourseDetail"));
const CourseProgress = lazy(() => import("./pages/student/CourseProgress"));
const SearchPage = lazy(() => import("./pages/student/SearchPage"));
const SecurePurchasedCourse = lazy(() => import("./components/SecurePurchasedCourse"));
const BecomeInstructor = lazy(() => import("./pages/admin/BecomeInstructor"));
const Features = lazy(() => import("./pages/student/Features"));
const Footer = lazy(() => import("./pages/student/Footer"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
  const { data: profileData, isLoading, refetch } = useGetUserQuery();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <MainLayout data={profileData} />
        </>
      ),
      children: [
        {
          path: "/",
          element: (
            <>
              <Suspense fallback={<LoadingScreen message="Loading home" />}>
            <Hero />
            <Features />
            <Courses />
            <Footer />
          </Suspense>
            </>
          ),
        },
        {
          path: "my-learning",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingScreen message="Loading learning hub" />}>
                <MyLearning data={profileData} isLoading={isLoading} />
                <Footer />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingScreen message="Loading profile" />}>
                <Profile
                  data={profileData}
                  isLoading={isLoading}
                  refetch={refetch}
                />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "instructor",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingScreen message="Preparing instructor area" />}>
                <BecomeInstructor />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "search-page",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingScreen message="Searching courses" />}>
                <SearchPage />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "course-detail/:courseId",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<LoadingScreen message="Loading course" />}>
                <CourseDetail />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "course-progress/:courseId",
          element: (
            <ProtectedRoute>
              <SecurePurchasedCourse>
                <Suspense fallback={<LoadingScreen message="Loading progress" />}>
                  <CourseProgress />
                </Suspense>
              </SecurePurchasedCourse>
            </ProtectedRoute>
          ),
        },

        //admin routes
        {
          path: "admin",
          element: (
            <AdminAcess>
              <Suspense fallback={<LoadingScreen message="Loading admin panel" />}>
                <Sidebar />
              </Suspense>
            </AdminAcess>
          ),
          children: [
            {
              path: "dashboard",
              element: (
                <Suspense fallback={<LoadingScreen message="Loading dashboard" />}>
                  <Dashboard />
                </Suspense>
              ),
            },
            {
              path: "course",
              element: (
                <Suspense fallback={<LoadingScreen message="Loading courses" />}>
                  <CourseTable />
                </Suspense>
              ),
            },
            {
              path: "course/create",
              element: (
                <Suspense fallback={<LoadingScreen message="Loading course editor" />}>
                  <CreateCourse />
                </Suspense>
              ),
            },
            {
              path: "course/:courseId",
              element: (
                <Suspense fallback={<LoadingScreen message="Loading course editor" />}>
                  <EditCourse />
                </Suspense>
              ),
            },
            {
              path: "course/lecture/:courseId",
              element: (
                <Suspense fallback={<LoadingScreen message="Loading lectures" />}>
                  <CreateLectures />
                </Suspense>
              ),
            },
            {
              path: "course/lecture/:courseId/:lectureId",
              element: (
                <Suspense fallback={<LoadingScreen message="Loading lecture editor" />}>
                  <EditLecture />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: (
        <LoggedInUser>
          <Login />
        </LoggedInUser>
      ),
    },
    {
      path: "register",
      element: (
        <LoggedInUser>
          <Login />
        </LoggedInUser>
      ),
    },
    {
      path: "forgot-password",
      element: (
        <Suspense fallback={<LoadingScreen message="Preparing reset" />}>
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: "reset-password/:token",
      element: (
        <Suspense fallback={<LoadingScreen message="Preparing reset" />}>
          <ResetPassword />
        </Suspense>
      ),
    },
  ]);

  return (
    <>
      {/* <main> */}

      <RouterProvider router={appRouter} />
      {/* </main> */}
    </>
  );
}

export default App;
