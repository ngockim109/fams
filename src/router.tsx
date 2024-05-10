/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "./components/templates/Layout/Layout";
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/NotFound";
import Forbidden from "./components/pages/Forbidden/Forbidden";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import StudentsManagement from "./components/pages/StudentsManagement/StudentsManagement";
import StudentDetail from "./components/pages/StudentDetail/StudentDetail";
import AddStudent from "./components/pages/AddStudent/AddStudent";
import EditStudent from "./components/pages/EditStudent/EditStudent";
import ReservedStudents from "./components/pages/ReservedStudents/ReservedStudents";
import EditScore from "./components/pages/EditScore/EditScore";
import EmailsManagement from "./components/pages/EmailsManagement/EmailsManagement";
import ClassesManagement from "./components/pages/ClassesManagement/ClassesManagement";
import RouterEndpoints from "./constants/RouterEndpoints";
import Profile from "./components/pages/Profile/Profile";
import UserManagement from "./components/pages/UserManagement/UserManagement";
import AttendeeDetail from "./components/pages/AttendeeDetail/AttendeeDetail";
import ClassDetail from "./components/pages/ClassDetail/ClassDetail";
import UserDetail from "./components/pages/UserDetail/UserDetail";
import SubLayout from "./components/templates/SubLayout/SubLayout";
import EmailDetail from "./components/pages/EmailDetail/EmailDetail";
import AddEmail from "./components/pages/AddEmail/AddEmail";
import EditEmail from "./components/pages/EditEmail/EditEmail";
import { isAuthorized } from "./utils/JWTAuth";

interface PrivateRouteProps {
  element: JSX.Element;
  requiredRoles: string[];
}

// handle authorization
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  requiredRoles,
}) => {
  const tokenExists = localStorage.getItem("token");
  return tokenExists && isAuthorized(requiredRoles) ? (
    React.cloneElement(element)
  ) : (
    <Forbidden />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: localStorage.getItem("token") ? <Layout /> : null,
    children: [
      {
        index: true,
        element: <Navigate to={RouterEndpoints.Login} />,
      },
      {
        path: RouterEndpoints.Login,
        element: <Login />,
      },

      // DASHBOARD
      {
        path: RouterEndpoints.Dashboard,
        element: (
          <PrivateRoute element={<Dashboard />} requiredRoles={["Admin"]} />
        ),
      },

      // STUDENTS MANAGEMENT
      {
        path: RouterEndpoints.StudentsManagement,
        element: (
          <PrivateRoute
            element={<StudentsManagement />}
            requiredRoles={["Admin"]}
          />
        ),
      },
      {
        path: RouterEndpoints.StudentDetail,
        element: (
          <PrivateRoute
            element={<StudentDetail />}
            requiredRoles={["Admin", "Trainer"]}
          />
        ),
      },
      {
        path: RouterEndpoints.AddStudent,
        element: (
          <PrivateRoute element={<AddStudent />} requiredRoles={["Admin"]} />
        ),
      },
      {
        path: RouterEndpoints.EditStudent,
        element: (
          <PrivateRoute element={<EditStudent />} requiredRoles={["Admin"]} />
        ),
      },

      {
        path: RouterEndpoints.ReservedStudents,
        element: (
          <PrivateRoute
            element={<ReservedStudents />}
            requiredRoles={["Admin"]}
          />
        ),
      },

      // CLASSES MANAGEMENT
      {
        path: RouterEndpoints.ClassesManagement,
        element: (
          <PrivateRoute
            element={<ClassesManagement />}
            requiredRoles={["Admin", "Trainer"]}
          />
        ),
      },
      {
        path: RouterEndpoints.AttendeeDetail,
        element: (
          <PrivateRoute
            element={<AttendeeDetail />}
            requiredRoles={["Admin", "Trainer"]}
          />
        ),
      },
      {
        path: RouterEndpoints.ClassDetail,
        element: (
          <PrivateRoute
            element={<ClassDetail />}
            requiredRoles={["Admin", "Trainer"]}
          />
        ),
      },
      // SCORES MANAGEMENT
      {
        path: RouterEndpoints.EditScore,
        element: (
          <PrivateRoute
            element={<EditScore />}
            requiredRoles={["Admin", "Trainer"]}
          />
        ),
      },

      // EMAIL MANAGEMENT
      {
        path: RouterEndpoints.EmailsManagement,
        element: (
          <PrivateRoute
            element={<EmailsManagement />}
            requiredRoles={["Admin"]}
          />
        ),
      },
      {
        path: RouterEndpoints.EmailDetail,
        element: (
          <PrivateRoute element={<EmailDetail />} requiredRoles={["Admin"]} />
        ),
      },
      {
        path: RouterEndpoints.AddEmail,
        element: (
          <PrivateRoute element={<AddEmail />} requiredRoles={["Admin"]} />
        ),
      },
      {
        path: RouterEndpoints.EditEmail,
        element: (
          <PrivateRoute element={<EditEmail />} requiredRoles={["Admin"]} />
        ),
      },
      // USER MANAGEMENT
      {
        path: RouterEndpoints.UsersManagement,
        element: (
          <PrivateRoute
            element={<UserManagement />}
            requiredRoles={["Admin"]}
          />
        ),
      },
      {
        path: RouterEndpoints.UserDetail,
        element: (
          <PrivateRoute element={<UserDetail />} requiredRoles={["Admin"]} />
        ),
      },
    ],
  },
  // PROFILE
  {
    path: "",
    element: <SubLayout />,
    children: [
      {
        path: RouterEndpoints.Profile,
        element: (
          <PrivateRoute
            element={<Profile />}
            requiredRoles={["Admin", "Trainer"]}
          />
        ),
      },
    ],
  },

  // PUBLIC PAGES

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
