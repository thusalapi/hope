import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSession from "./pages/CreateSession";
import InstructorDashboard from "./pages/InstructorDashboard";
import ViewGradesPage from "./pages/ViewGradesPage";
import ViewStudents from "./pages/ViewStudents";
import ReviewSubmissionPage from "./pages/ReviewSubmissionPage";
import UserManagement from "./pages/UserManagement";
import InstructorSessionsPage from "./pages/InstructorSessionsPage";
import InstructorSession from "./pages/InstructorSession";
import SessionList from "./components/Extension/SessionList";
import LoginPage from "./pages/LoginPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <InstructorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/createSession",
    element: <CreateSession />,
  },
  {
    path: "/instructorSessions",
    element: <InstructorSessionsPage />,
  },
  {
    path: "/session/:id",
    element: <InstructorSession />,
  },
  {
    path: "/users",
    element: <UserManagement />,
  },
  {
    path: "/viewgrades",
    element: <ViewGradesPage />,
  },
  {
    path: "/viewstudents",
    element: <ViewStudents />,
  },
  {
    path: "/reviewsubmission",
    element: <ReviewSubmissionPage />,
  },
  {
    path: "/sessionlist",
    element: <SessionList />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
