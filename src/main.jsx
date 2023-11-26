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
      }
      ,
      {
        path: "/signUp",
        element: <SignUp />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
