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
import UserManagement from "./pages/UserManagement";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" replace />,
  },
  {
    path: "/signin",
    element: <Login />,
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
    element: <InstructorDashboard />,
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
    path: "/users",
    element: <UserManagement />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
