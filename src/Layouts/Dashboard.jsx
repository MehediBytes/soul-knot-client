import { Link, Outlet, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/UseAdmin';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const location = useLocation();
    const { user, logOut } = useAuth();

    // Handle Logout
    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are now loged out",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Problem in log out.", error,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div className="md:flex container mx-auto">
            {/* dashboard side bar */}
            <div className="md:w-1/4 md:min-h-screen bg-pink-500">
                <ul className='text-center md:py-10 py-4 px-4 text-white space-y-3'>
                    {
                        isAdmin ? <>
                            <div>
                                <Link to={"/dashboard/adminHome"}
                                    className={`p-1 ${location.pathname === '/dashboard/adminHome' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                >
                                    {user?.displayName} Dashboard
                                </Link>
                            </div>

                        </>
                            : <>
                                <div>
                                    <Link to={"/dashboard/userHome"}
                                        className={`p-1 ${location.pathname === '/dashboard/userHome' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        {user?.displayName} Dashboard
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/editBiodata"}
                                        className={`p-1 ${location.pathname === '/dashboard/editBiodata' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Edit Biodata
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/viewBiodata"}
                                        className={`p-1 ${location.pathname === '/dashboard/viewBiodata' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        View Biodata
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/contactRequest"}
                                        className={`p-1 ${location.pathname === '/dashboard/contactRequest' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        My Contact Request
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/favouritesBiodata"}
                                        className={`p-1 ${location.pathname === '/dashboard/favouritesBiodata' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Favourites Biodata
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"/dashboard/gotMarried"}
                                        className={`p-1 ${location.pathname === '/dashboard/gotMarried' ? 'border-b-2 rounded-lg border-white' : ''}`}
                                    >
                                        Got Married
                                    </Link>
                                </div>

                            </>
                    }
                    <hr className='text-white my-10' />

                    {/* shared link */}
                    <div className='space-y-3'>
                        <Link to={"/"}>Home</Link>

                        <div>
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="p-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;