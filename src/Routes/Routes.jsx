import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home/Home";
import Biodata from "../Pages/Home/Biodata/Biodata";
import About from "../Pages/Home/About/About";
import Contact from "../Pages/Home/Contact/Contact";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";

export const router = createBrowserRouter([

    // Main layout routes
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/biodata',
            element: <Biodata></Biodata>
        },
        {
            path: '/about',
            element: <About></About>
        },
        {
            path: '/contact',
            element: <Contact></Contact>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <SignUp></SignUp>
        },
      ]
    },
  ]);