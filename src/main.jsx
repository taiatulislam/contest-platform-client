import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Routes/Root.jsx';
import Home from './Layout/Home/Home.jsx';
import AllContest from './Layout/AllContest/AllContest.jsx';
import Login from './Layout/Login/Login.jsx';
import SignUp from './Layout/SignUp/SignUp.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import ContestDetails from './Layout/ContestDetails/ContestDetails.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Dashboard from './Layout/Dashboard/Dashboard.jsx';
import UpdateProfile from './Layout/Dashboard/UpdateProfile.jsx';
import Participated from './Layout/Dashboard/Participated.jsx';
import AdminDashboard from './Layout/AdminDashboard/AdminDashboard.jsx';
import ManageUsers from './Layout/AdminDashboard/ManageUsers.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allContest",
        element: <AllContest />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><ContestDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/details/${params.id}`)
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/updateProfile",
    element: <PrivateRoute><UpdateProfile /></PrivateRoute>
  },
  {
    path: "/participated",
    element: <PrivateRoute><Participated /></PrivateRoute>
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard></AdminDashboard>
  },
  {
    path: "/manageUsers",
    element: <ManageUsers></ManageUsers>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
