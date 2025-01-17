import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home/Home";
import About from "../Pages/Home/About/About";
import Contact from "../Pages/Home/Contact/Contact";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import BiodataPage from "../Pages/Home/BiodataPage/BiodataPage";
import PrivateRoute from "./PrivateRoute";
import BiodataDetails from "../Pages/Home/BiodataDetails/BiodataDetails";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import Dashboard from "../Layouts/Dashboard";
import EditBiodata from "../Pages/Dashboard/UserHome/EditBiodata";
import ViewBiodata from "../Pages/Dashboard/UserHome/ViewBiodata";
import FavouritesBiodata from "../Pages/Dashboard/UserHome/FavouritesBiodata";
import ContactRequest from "../Pages/Dashboard/UserHome/ContactRequest";
import GotMarried from "../Pages/Dashboard/UserHome/GotMarried";
import ManageUsers from "../Pages/Dashboard/AdminHome/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/AdminHome/ApprovedPremium";
import ApprovedContact from "../Pages/Dashboard/AdminHome/ApprovedContact";
import SuccessStory from "../Pages/Dashboard/AdminHome/SuccessStory";

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
                element: <BiodataPage></BiodataPage>
            },
            {
                path: '/biodata/:id',
                element: <PrivateRoute> <BiodataDetails></BiodataDetails> </PrivateRoute>
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
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal user routes 
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'editBiodata',
                element: <EditBiodata></EditBiodata>
            },
            {
                path: 'viewBiodata',
                element: <ViewBiodata></ViewBiodata>
            },
            {
                path: 'contactRequest',
                element: <ContactRequest></ContactRequest>
            },
            {
                path: 'favouritesBiodata',
                element: <FavouritesBiodata></FavouritesBiodata>
            },
            {
                path: 'gotMarried',
                element: <GotMarried></GotMarried>
            },

            // admin only routes
            {
                path: 'adminHome',
                element: <AdminRoute> <AdminHome></AdminHome> </AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute> <ManageUsers></ManageUsers> </AdminRoute>
            },
            {
                path: 'approvedPremium',
                element: <AdminRoute> <ApprovedPremium></ApprovedPremium> </AdminRoute>
            },
            {
                path: 'approvedContact',
                element: <AdminRoute> <ApprovedContact></ApprovedContact> </AdminRoute>
            },
            {
                path: 'successStory',
                element: <AdminRoute> <SuccessStory></SuccessStory> </AdminRoute>
            },

        ]
    }
]);