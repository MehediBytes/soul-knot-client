import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home/Home";
import Biodata from "../Pages/Home/Home/Biodata/Biodata";
import About from "../Pages/Home/Home/About/About";
import Contact from "../Pages/Home/Home/Contact/Contact";

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
            element: <h3>Login page.....</h3>
        },
        {
            path: '/signup',
            element: <h3>Sign up page......</h3>
        },
      ]
    },
  ]);